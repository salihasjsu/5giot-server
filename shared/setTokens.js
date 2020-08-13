const { sign } = require("jsonwebtoken");

function setTokens(user) {
  const sevenDays = 60 * 60 * 24 * 7 * 1000; // if changes here change it into post user service as well
  const fifteenMins = 60 * 1;
  const accessUser = {
    id: user._id,
  };
  const accessToken = sign({ user: accessUser }, "abcdef", {
    expiresIn: fifteenMins,
  });
  const refreshUser = {
    id: user._id,
    count: user.tokenCount,
  };
  const refreshToken = sign({ user: refreshUser }, "abcdef", {
    expiresIn: sevenDays,
  });

  return { accessToken, refreshToken };
}

module.exports = { setTokens };
