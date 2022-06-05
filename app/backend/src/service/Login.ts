import Token from '../utils/Token';
import Users from '../database/models/users';
import Unauthorized from '../error/unauthorized';
import BadRequest from '../error/badRequest';
import ILogin from '../interface/ILogin';

export default class LoginService {
  token = new Token();
  async login(dataLogin: ILogin) {
    const { email, password } = dataLogin;
    const validateEmail = /^([a-zA-z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;
    if (!email || !password) throw new BadRequest('All fields must be filled');
    if (password.length < 6) {
      throw new
      BadRequest('"password" length must be at least 6 characters long"');
    }
    if (validateEmail.test(email) === false) {
      throw new
      BadRequest('"email" must be a valid email');
    }
    const user = await Users
      .findOne({ where: { email, password }, attributes: { exclude: ['password'] } });
    if (!user) throw new Unauthorized('Incorrect email or password');
    const token = this.token.createToken();
    return { user, token };
  }
}
