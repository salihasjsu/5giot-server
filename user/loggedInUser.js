const { AuthenticationError } = require("apollo-server-express");
const { getUserById } = require("./fetchUser");
// logged in user resolver
const isEmpty = require("lodash/isEmpty");
async function loggedInUser(_, __, { req }) {
  if (isEmpty(req.user)) throw new AuthenticationError("Must authenticate");
  let id = req.user.id;
  let user = await getUserById(id);
  return user;
}

module.exports = { loggedInUser };
