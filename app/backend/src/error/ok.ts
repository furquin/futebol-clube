import HttpStatusCode from '../utils/httpStatus';
import ErrorBase from './errorBase';

export default class Ok extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatusCode.OK);
  }
}
