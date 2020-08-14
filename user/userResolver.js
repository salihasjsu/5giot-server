const { ApolloServer, AddArgumentsAsVariables } = require("apollo-server-koa");
const { getUserList, getUserByName, loggedInUser } = require("./fetchUser");
const { addUser, login } = require("./postUser");
const { updateUser } = require("./updateUser");
const { deleteUser } = require("./deleteUser");
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
