import { Request, Response, NextFunction } from 'express';
import LoginService from '../service/Login';
import Token from '../utils/Token';
import Unauthorized from '../error/unauthorized';

export default class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await LoginService.login(req.body);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw new Unauthorized('Token not found');
      const { role } = await Token.decodedToken(authorization);

      return res.status(200).json(role);
    } catch (e) {
      next(e);
    }
  }
}
