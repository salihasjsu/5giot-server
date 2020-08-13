const {
  ApolloServer,
  gql,
  makeExecutableSchema,
} = require("apollo-server-koa");
const assetSchema = gql`
  extend type Query {
    assets: [asset]
    assetById(id: ID!): asset
  }
  extend type Mutation {
    addAsset(
      _id: String
      name: String!
      model: String!
      manufactureId: String!
      manufactureDate: String!
    ): response
    updateAsset(
      _id: String
      name: String!
      model: String!
      manufactureId: String!
      manufactureDate: String!
    ): response
    deleteAsset(_id: String!): response
  }
  type asset {
    _id: String
    name: String
    manufactureId: String
    manufactureDate: String
    model: String
  }
`;
module.exports = assetSchema;
