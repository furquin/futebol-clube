import * as fs from 'fs';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import IUser from '../interface/IUser';

export default class TokenService {
  static _secret: string = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
  static _jwtConfig: SignOptions = {
    expiresIn: '30d',
    algorithm: 'HS256',
  };

  static createToken = (user: Omit<IUser, 'password'>): string => {
    const token = sign(user, this._secret, this._jwtConfig);
    return token;
  };

  static decodedToken = (token: string) => {
    const decode = verify(token, this._secret);
    return decode as IUser;
  };
}
