const MongoClient = require("mongodb").MongoClient;
const { UserInputError } = require("apollo-server-koa");
var ObjectID = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017";
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
        let database = client.db("5gIoT");
        resolve(database);
        console.log("Database Connected...");
      })
    ).catch((e) => {
      console.log("could not get connection to MongoDB ..\n" + e);
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
