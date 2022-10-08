import { Severity } from 'gc-json-logger';
import { LogEntryMetadata } from './LogEntryMetadata';

export interface LogEntry {
  severity: Severity;
  message: string;
  meta: LogEntryMetadata;
}
