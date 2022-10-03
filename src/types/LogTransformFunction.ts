import { Request, Response } from 'express';
import { LogEntry } from './LogEntry';

export type LogTransformFunction = (req: Request, res: Response, entry: LogEntry) => LogEntry;
