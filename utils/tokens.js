const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const generateTokens = (data) => {
  const accessToken = jwt.sign(data, ACCESS_SECRET_KEY, { expiresIn: "24h" });
  const refreshToken = jwt.sign(data, REFRESH_SECRET_KEY, { expiresIn: "72h" });

  return {
    accessToken,
    refreshToken,
  };
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, ACCESS_SECRET_KEY);
    return userData;
  } catch (error) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, REFRESH_SECRET_KEY);
    return userData;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
};
