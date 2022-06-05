import HttpStatusCode from '../utils/httpStatus';
import ErrorBase from './errorBase';

export default class UnprocessableEntity extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);
  }
}
