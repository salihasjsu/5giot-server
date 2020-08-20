const { getDBConnection, getObjectId } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-express");

async function deleteUser(root, { _id }) {
  console.log("going to delete user...");
  const userCollection = getDBConnection().collection("users");
  return userCollection.deleteOne({ _id: getObjectId(_id) }).then((res) => {
    if (!res)
      throw new UserInputError("Could not find user for ID specified", {
        ID: _id,
      });
    console.log(res);
    return { code: "200", isError: false, message: "successfully deleted" };
  });
}

module.exports = { deleteUser };
