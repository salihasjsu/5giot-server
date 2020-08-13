const {
  ApolloServer,
  gql,
  makeExecutableSchema,
} = require("apollo-server-koa");
const responseSchema = gql`
  type response {
    code: String!
    isError: Boolean
    message: String!
  }
`;
module.exports = responseSchema;
