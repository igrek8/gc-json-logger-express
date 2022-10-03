import { IncomingHttpHeaders } from 'http';

export interface LogRequest {
  headers: IncomingHttpHeaders;
  body?: unknown;
}
