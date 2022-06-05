import { sign, verify, SignOptions } from 'jsonwebtoken';

export default class TokenService {
  protected secret = 'segredo';

  protected jwtConfig: SignOptions = {
    expiresIn: '30d',
    algorithm: 'HS256',
  };

  protected user = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  };

  createToken = (): string => {
    const token = sign(this.user, this.secret, this.jwtConfig);
    return token;
  };

  decodedToken = (token: string): object | string => {
    const decode = verify(token, this.secret);
    return decode;
  };
}
