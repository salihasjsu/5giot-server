const { verify } = require("jsonwebtoken");
const { secretKey } = require("../config/config");

function validateAccessToken(token) {
  try {
    return verify(token, secretKey);
  } catch {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return verify(token, secretKey);
  } catch {
    return null;
  }
}

module.exports = { validateAccessToken, validateRefreshToken };
