const { ApolloServer, AddArgumentsAsVariables } = require("apollo-server-koa");
const { getUserList, getUserByName } = require("./fetchUser");
const { addUser, login } = require("./postUser");
const { updateUser } = require("./updateUser");
const { deleteUser } = require("./deleteUser");
const { loggedInUser } = require("./loggedInUser");
const userResolver = {
  Query: {
    users: getUserList,
    userByName: getUserByName,
  },
  Mutation: {
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    login: login,
    loggedInUser: loggedInUser,
  },
};

module.exports = userResolver;
