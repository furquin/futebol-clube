import HttpStatusCode from '../utils/httpStatus';
import ErrorBase from './errorBase';

export default class NotFound extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}
