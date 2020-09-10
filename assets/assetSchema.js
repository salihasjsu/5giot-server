const {
  ApolloServer,
  gql,
  makeExecutableSchema,
} = require("apollo-server-express");
const assetSchema = gql`
  extend type Query {
    assets: [asset]
    assetById(id: String!): asset
  }
  extend type Mutation {
    addAsset(
      _id: String
      name: String!
      manufacturer: String!
      imei: String!
      status: String!
    ): response
    updateAsset(
      _id: String
      name: String!
      imei: String!
      manufacturer: String!
      status: String!
    ): response
    deleteAsset(_id: String!): response
  }
  type asset {
    _id: String
    name: String
    manufacturer: String
    imei: String
    status: String
  }
`;
module.exports = assetSchema;
