const { getDBConnection, getObjectId } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-express");

async function getAssetList() {
  console.log("going to get AssetList");
  const assetCollection = getDBConnection().collection("assets");
  let result = null;
  result = await new Promise((resolve, reject) => {
    result = assetCollection.find({}).toArray((err, items) => {
      if (err) reject(err);
      resolve(items);
    });
  });
  return result;
}

async function getAssetById(root, { _id }) {
  const assetCollection = getDBConnection().collection("assets");
  return assetCollection.findOne({ _id: getObjectId(_id) }, {}).then((res) => {
    if (!res)
      throw new UserInputError("Could not find asset for ID specified", {
        ID: id,
      });

    return res;
  });
}
module.exports = { getAssetList, getAssetById };
