const MongoClient = require("mongodb").MongoClient;
const { dbDeatils } = require("./config/config");
var ObjectID = require("mongodb").ObjectID;
const { logger } = require("./logger.js");
const url =
  dbDeatils.url +
  dbDeatils.username +
  ":" +
  dbDeatils.password +
  "@" +
  dbDeatils.host +
  ":" +
  dbDeatils.port;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = null;

async function initDB() {
  if (!db) {
    db = await new Promise((resolve, reject) =>
      client.connect((err) => {
        if (err) return reject(err);
        let database = client.db(dbDeatils.dbName);
        resolve(database);
        logger.debug("Database Connected successfully");
      })
    ).catch((e) => {
      logger.debug("could not get connection to MongoDB ..\n" + e);
      process.exit(1);
    });
  }
}

function getDBConnection() {
  return db;
}

function getObjectId(id) {
  return new ObjectID(id);
}

function closeDB() {
  if (db) client.close();
}

module.exports = { initDB, getDBConnection, getObjectId, closeDB };
