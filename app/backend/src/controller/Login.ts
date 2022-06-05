import { Request, Response, NextFunction } from 'express';
import LoginService from '../service/Login';

export default class LoginController {
  public loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await this.loginService.login(email, password);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
}
