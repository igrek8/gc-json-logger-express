import { OutgoingHttpHeaders } from 'http';

export interface LogResponse {
  headers: OutgoingHttpHeaders;
  body?: unknown;
}
