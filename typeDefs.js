const { gql } = require("apollo-server-koa");
const userType = require("./user/userSchema");
const assetType = require("./assets/assetSchema");
const responseType = require("./shared/responseSchema");

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;
const schemaArray = [root, responseType, userType, assetType];

module.exports = schemaArray;
