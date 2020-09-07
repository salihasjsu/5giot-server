const { gql } = require("apollo-server-express");
const userSchema = gql`
  extend type Query {
    users: [user]
    userByName(userName: String!): user
    loggedInUser: user
  }
  extend type Mutation {
    addUser(
      _id: String
      userName: String!
      email: String!
      password: String!
      role: String!
      firstName: String!
      lastName: String!
      address: String!
      contactNumber: String!
    ): response
    updateUser(
      _id: String
      userName: String!
      email: String!
      password: String
      role: String!
      firstName: String!
      lastName: String!
      address: String!
      contactNumber: String!
    ): response
    deleteUser(_id: String!): response
    login(userName: String!, password: String!): tokens
  }
  type user {
    _id: String
    userName: String
    email: String
    role: String
    firstName: String
    lastName: String
    address: String
    password: String
    contactNumber: String
  }

  type tokens {
    accessToken: String
    refreshToken: String
  }
`;
module.exports = userSchema;
