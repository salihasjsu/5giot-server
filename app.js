const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { serverConfig, logLevel } = require("./config/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const typeDefs = require("./typeDefs");
const { initDB, closeDB } = require("./dbAdapter");
const userResolver = require("./user/userResolver");
const assetResolver = require("./assets/assetResolver");
const { validateTokensMiddleware } = require("./shared/validateMidlleware");
const { logger } = require("./logger.js");
const { wsServer } = require("./WebSocketServer/server");
const app = express();
app.use(cors(), bodyParser.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: [userResolver, assetResolver],
  context: ({ req, res }) => ({ req, res }),
});
app.use(validateTokensMiddleware);
apolloServer.applyMiddleware({ app, path: "/graphql" });
/*
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.info("login request");
  const token = jwt.sign({ sub: 1 }, jwtSecret);
  res.send(token);
});*/
const server = app.listen(serverConfig.port, serverConfig.host, () => {
  logger.debug(
    `server started at path ${apolloServer.graphqlPath} on ${serverConfig.port}`
  );
  initDB();
});

process.on("SIGTERM", () => {
  closeDB();
  server.close();
});
