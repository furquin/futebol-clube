import * as fs from 'fs';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import IUser from '../interface/IUser';

export default class TokenService {
  protected _secret: string;
  protected _jwtConfig: SignOptions;

  constructor() {
    this._secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    this._jwtConfig = {
      expiresIn: '30d',
      algorithm: 'HS256',
    };
  }

  protected user = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  };

  createToken = (user: IUser): string => {
    const token = sign({ user }, this._secret, this._jwtConfig);
    return token;
  };

  decodedToken = (token: string): object | string => {
    const decode = verify(token, this._secret);
    return decode;
  };
}
