import { NextFunction, Request, Response } from 'express';
import ErrorBase from '../error/errorBase';

export default function GenericError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ErrorBase) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
}
