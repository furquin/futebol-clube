import { Request, Response, NextFunction } from 'express';
import Unauthorized from '../error/unauthorized';

export default class ValidateToken {
  static async validate(req: Request, _res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw new Unauthorized('Token not found');

      next();
    } catch (e) {
      next(e);
    }
  }
}
