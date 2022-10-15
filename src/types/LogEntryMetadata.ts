import { HttpRequest, LogEntryMetadata as ILogEntryMetadata } from 'gc-json-logger';

export interface LogEntryMetadata extends ILogEntryMetadata {
  httpRequest: HttpRequest;
  httpRequestBody?: unknown;
  httpRequestHeaders: Record<string, string>;
  httpResponseBody?: unknown;
  httpResponseHeaders: Record<string, string>;
}
