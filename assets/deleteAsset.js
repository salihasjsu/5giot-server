const { getDBConnection, getObjectId } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-express");

async function deleteAsset(root, { _id }) {
  console.log("going to delete asset...");
  const assetCollection = getDBConnection().collection("assets");
  console.log(getObjectId(_id));
  return assetCollection.deleteOne({ _id: getObjectId(_id) }).then((res) => {
    if (!res)
      throw new UserInputError("Could not find asset for ID specified", {
        ID: _id,
      });
    console.log(res);
    return { code: "200", isError: false, message: "successfully deleted" };
  });
}

module.exports = { deleteAsset };
