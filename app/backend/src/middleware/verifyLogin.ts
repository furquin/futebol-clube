import * as bcrypt from 'bcryptjs';
import BadRequest from '../error/badRequest';
import Unauthorized from '../error/unauthorized';
import IUser from '../interface/IUser';

export default class ValidateData {
  static validLogin =
  async (
    email: string,
    password: string,
    user: IUser,
  ) => {
    const validateEmail = /^([a-zA-z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;

    if (password.length < 6) {
      throw new
      BadRequest('"password" length must be at least 6 characters long"');
    }
    if (validateEmail.test(email) === false) {
      throw new
      BadRequest('"email" must be a valid email');
    }
    const passwordDecrypt = await bcrypt.compare(password, user.password);
    if (!passwordDecrypt) throw new Unauthorized('Incorrect email or password');
  };
}
