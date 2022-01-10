const { validateAccessToken } = require("./../utils/tokens");
const ErrorHandler = require("../utils/error-handler");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(ErrorHandler.UnauthorizedError());
    }
    const userData = validateAccessToken(token);
    if (!userData) {
      return next(ErrorHandler.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
