import Token from '../utils/Token';
import Users from '../database/models/users';
import Unauthorized from '../error/unauthorized';
import ILogin from '../interface/ILogin';
import VerifyLogin from '../middleware/verifyLogin';
import BadRequest from '../error/badRequest';

export default class LoginService {
  static async login(dataLogin: ILogin) {
    const { email, password } = dataLogin;

    if (!email || !password) throw new BadRequest('All fields must be filled');

    const user = await Users
      .findOne({ where: { email } });
    if (!user) throw new Unauthorized('Incorrect email or password');
    const { id, username, role } = user;
    await VerifyLogin.validLogin(email, password, user);

    const token = Token.createToken({ id, username, role, email });
    return {
      user: { id, username, role, email }, token };
  }
}
