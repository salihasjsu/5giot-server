const { sign } = require("jsonwebtoken");
const { secretKey } = require("../config/config");

function setTokens(user) {
  const twoDays = 60 * 2; // if changes here change it into post user service as well
  const fifteenMins = 60 * 1;
  const accessUser = {
    id: user._id,
  };
  const accessToken = sign({ user: accessUser }, secretKey, {
    expiresIn: fifteenMins,
  });
  const refreshUser = {
    id: user._id,
    count: user.tokenCount,
  };
  const refreshToken = sign({ user: refreshUser }, secretKey, {
    expiresIn: twoDays,
  });

  return { accessToken, refreshToken };
}

module.exports = { setTokens };
