import { Request, Response } from 'express';
import { LogEntry } from './LogEntry';

export interface LogOptions {
  log(req: Request, res: Response, entry: LogEntry): LogEntry;
}
