import { NextFunction, Request, Response } from 'express';
import { Logger, Severity } from 'gc-json-logger';
import ms from 'ms';

import { LogTransformFunction } from './types/LogTransformFunction';
import { clone } from './utils/clone';

const passThrough: LogTransformFunction = (_req, _res, entry) => entry;

export function log(transform: LogTransformFunction = passThrough) {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = new Date();
    const logger = Logger.getLogger();

    /**
     * Capture outgoing response body
     */
    let _body: unknown;

    const _json = res.json;
    res.json = function json(body?: unknown) {
      _body ??= body;
      res.json = _json;
      return res.json(body);
    };

    const _send = res.send;
    res.send = function send(body?: unknown) {
      _body ??= body;
      res.send = _send;
      return res.send(body);
    };

    try {
      const entry = transform(req, res, {
        severity: Severity.INFO,
        message: `${req.method} ${req.url}`,
        meta: {
          labels: {
            event: 'http:request',
          },
          httpRequest: {
            protocol: `${req.protocol}/${req.httpVersion}`.toUpperCase(),
            requestSize: req.socket.bytesRead.toString(),
            remoteIp: req.ip,
            requestUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            requestMethod: req.method,
            userAgent: req.header('User-Agent')?.toString(),
            serverIp: `${req.socket.localAddress}:${req.socket.localPort}`,
            referer: req.header('Referer'),
          },
          request: clone({
            headers: req.headers,
            body: req.body,
          }),
          response: clone({
            headers: res.getHeaders(),
            body: _body,
          }),
        },
      });
      logger.log(entry.severity, entry.message, entry.meta);
    } catch {
      /* istanbul ignore next */
    }

    res.once('finish', async () => {
      try {
        const end = new Date();
        const latency = ms(end.getTime() - start.getTime());
        const entry = transform(req, res, {
          severity: Severity.INFO,
          message: `${res.statusCode} ${req.method} ${req.url} (${latency})`,
          meta: {
            labels: {
              event: 'http:response',
            },
            httpRequest: {
              latency,
              responseSize: req.socket.bytesWritten.toString(),
              status: res.statusCode,
            },
            request: clone({
              headers: req.headers,
              body: req.body,
            }),
            response: clone({
              headers: res.getHeaders(),
              body: _body,
            }),
          },
        });
        logger.log(entry.severity, entry.message, entry.meta);
      } catch (err) {
        /* istanbul ignore next */
      }
    });
    next();
  };
}
