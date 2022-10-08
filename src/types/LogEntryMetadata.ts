import { LogEntryMetadata as ILogEntryMetadata } from 'gc-json-logger';

export interface LogEntryMetadata extends ILogEntryMetadata {
  httpRequestBody?: unknown;
  httpRequestHeaders: Record<string, string>;
  httpResponseBody?: unknown;
  httpResponseHeaders: Record<string, string>;
}
