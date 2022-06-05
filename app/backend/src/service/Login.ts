import Token from '../utils/Token';
import Users from '../database/models/users';

export default class LoginService {
  token = new Token();

  async login(email: string, password: string) {
    const user = await Users
      .findOne({ where: { email, password }, attributes: { exclude: ['password'] } });

    const token = this.token.createToken();
    return {
      user,
      token,
    };
  }
}
