const { UNAUTHORIZED } = require("./consts");
class ErrorHandler extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest = (message, errors = []) => {
    return new ErrorHandler(400, message, errors);
  };
  static UnauthorizedError = () => {
    return new ErrorHandler(401, UNAUTHORIZED);
  };
  static ForbiddenError = (message) => {
    return new ErrorHandler(403, message);
  };
}
module.exports = ErrorHandler;
