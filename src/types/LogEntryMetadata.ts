import { LogEntryMetadata as ILogEntryMetadata } from 'gc-json-logger';
import { LogRequest } from './LogRequest';
import { LogResponse } from './LogResponse';

export interface LogEntryMetadata extends ILogEntryMetadata {
  request: LogRequest;
  response: LogResponse;
}
