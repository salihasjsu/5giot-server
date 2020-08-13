const { verify } = require("jsonwebtoken");

function validateAccessToken(token) {
  try {
    return verify(token, "abcdef");
  } catch {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return verify(token, "abcdef");
  } catch {
    return null;
  }
}

module.exports = { validateAccessToken, validateRefreshToken };
