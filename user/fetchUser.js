const { getDBConnection, getObjectId } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-express");

async function getUserList() {
  console.log("going to get UserList");
  const userCollection = getDBConnection().collection("users");
  let result = null;
  result = await new Promise((resolve, reject) => {
    result = userCollection.find({}).toArray((err, items) => {
      if (err) reject(err);
      resolve(items);
    });
  });
  return result;
}

async function getUserByName(root, { userName }) {
  console.info("going to get user");
  const userCollection = getDBConnection().collection("users");
  return userCollection.findOne({ userName: userName }, {}).then((res) => {
    if (!res)
      throw new UserInputError("Could not find user for ID specified", {
        ID: userName,
      });
    return res;
  });
}

async function getUserById(id) {
  console.info("going to get user", id);
  const userCollection = getDBConnection().collection("users");
  let user = userCollection
    .findOne({ _id: getObjectId(id) }, {})
    .then((res) => {
      return res;
    });
  return user;
}
module.exports = { getUserList, getUserByName, getUserById };
