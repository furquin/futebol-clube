import HttpStatusCode from '../utils/httpStatus';
import ErrorBase from './errorBase';

export default class BadRequest extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}
