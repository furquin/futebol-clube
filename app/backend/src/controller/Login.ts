import { Request, Response, NextFunction } from 'express';
import LoginService from '../service/Login';

export default class LoginController {
  public _loginService: LoginService;

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
}
