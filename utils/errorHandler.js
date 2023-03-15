//ErrorHandler for Id incorrect, id length less/long
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports=ErrorHandler; //exports to middleware- error.js file