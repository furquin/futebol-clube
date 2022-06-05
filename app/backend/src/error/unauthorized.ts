import HttpStatusCode from '../utils/httpStatus';
import ErrorBase from './errorBase';

export default class Unauthorized extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}
