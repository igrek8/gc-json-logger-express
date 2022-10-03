import { NextFunction, Request, Response } from 'express';
import { Logger, Severity } from 'gc-json-logger';
import ms from 'ms';

import { LogTransformFunction } from './types/LogTransformFunction';

const passThrough: LogTransformFunction = (_req, _res, entry) => entry;

export function log(transform: LogTransformFunction = passThrough) {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = new Date();

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

    res.once('finish', async () => {
      try {
        const end = new Date();
        const latency = ms(end.getTime() - start.getTime());
        const entry = transform(req, res, {
          severity: Severity.INFO,
          message: `${res.statusCode} ${req.method} ${req.url} (${latency})`,
          meta: {
            httpRequest: {
              protocol: `${req.protocol}/${req.httpVersion}`.toUpperCase(),
              latency: latency,
              requestSize: req.socket.bytesRead.toString(),
              remoteIp: req.ip,
              requestUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
              requestMethod: req.method,
              responseSize: req.socket.bytesWritten.toString(),
              userAgent: req.header('User-Agent')?.toString(),
              serverIp: `${req.socket.localAddress}:${req.socket.localPort}`,
              status: res.statusCode,
              referer: req.header('Referer'),
            },
            request: {
              headers: req.headers,
              body: req.body,
            },
            response: {
              headers: res.getHeaders(),
              body: _body,
            },
          },
        });
        const logger = Logger.getLogger();
        logger.log(entry.severity, entry.message, entry.meta);
      } catch (err) {
        /* istanbul ignore next */
      }
    });
    next();
  };
}
