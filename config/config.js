const dotenv = require("dotenv");
dotenv.config();

const dbDetails = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
};
const serverConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
};

module.exports = {
  development: dbDetails,
  production: dbDetails,
  serverConfig: serverConfig,
  secretKey: process.env.SECRET_KEY,
};
