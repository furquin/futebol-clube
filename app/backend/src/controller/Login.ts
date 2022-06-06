import { Request, Response, NextFunction } from 'express';
import LoginService from '../service/Login';
import Token from '../utils/Token';
import Unauthorized from '../error/unauthorized';

export default class LoginController {
  public _loginService: LoginService;
  public _token = new Token();
  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this._loginService.login(req.body);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw new Unauthorized('Token not found');
      const { user } = await this._token.decodedToken(authorization);

      return res.status(200).json(user.role);
    } catch (e) {
      next(e);
    }
  }
}
