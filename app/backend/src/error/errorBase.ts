export default abstract class ErrorBase extends Error {
  protected statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
