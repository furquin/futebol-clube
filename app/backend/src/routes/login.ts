import { NextFunction, Request, Response, Router } from 'express';
import LoginController from '../controller/Login';
import LoginService from '../service/Login';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const login = Router();

export default login
  .post('/', (req: Request, res: Response, next: NextFunction) =>
    loginController.login(req, res, next));
