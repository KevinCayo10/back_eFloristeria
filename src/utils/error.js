class MyError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.serverMessage = this.serverMessage ?? 'Ocurrio un error inesperado'
    Error.captureStackTrace(this, this.constructor);
  }
}

export default MyError;
