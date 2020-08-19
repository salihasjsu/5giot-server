const { gql } = require("apollo-server-express");
const responseSchema = gql`
  type response {
    code: String!
    isError: Boolean
    message: String!
  }
`;
module.exports = responseSchema;
