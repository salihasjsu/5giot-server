const { setTokens } = require("./setTokens");
const { getUserById } = require("../user/fetchUser");
const {
  validateAccessToken,
  validaterefreshToken,
} = require("./validateTokens");

async function validateTokensMiddleware(req, res, next) {
  console.log("inside validate middleware");
  const refreshToken = req.headers["x-refresh-token"];
  const accessToken = req.headers["x-access-token"];
  if (!accessToken && !refreshToken) return next(); // if no tokens are present just skip the validation of tokens
  const decodedAccessToken = validateAccessToken(accessToken);
  console.log("Access token", decodedAccessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    console.log("Access token", decodedAccessToken);
    req.user = decodedAccessToken.user;
    return next();
  }

  /*  const decodedRefreshToken = validateRefreshToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    // valid refresh token
    const user = getUserById(decodedRefreshToken.user.id) 
    // valid user and user token not invalidated
    if (!user || user.tokenCount !== decodedRefreshToken.user.count)
      return next();
    req.user = decodedRefreshToken.user;
    // refresh the tokens
    const userTokens = setTokens(user);
    res.set({
      "Access-Control-Expose-Headers": "x-access-token,x-refresh-token",
      "x-access-token": userTokens.accessToken,
      "x-refresh-token": userTokens.refreshToken,
    });
    return next();
  }*/
  next();
}

module.exports = { validateTokensMiddleware };
