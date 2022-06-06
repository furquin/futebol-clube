import { Router } from 'express';
import LoginController from '../controller/Login';

const login = Router();

export default login
  .post('/', LoginController.login)
  .get('/validate', LoginController.validate);
