const { getDBConnection, getObjectId } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-express");

async function updateAsset(root, { _id, name, manufacturer, status, imei }) {
  console.log("going to updare user");
  const assetCollection = getDBConnection().collection("assets");
  var myquery = {};
  var obj = {
    name,
    manufacturer,
    imei,
    status,
  };
  let res = await new Promise((resolve, reject) => {
    assetCollection.findOneAndUpdate(
      {
        _id: getObjectId(_id),
      },
      { $set: obj },
      { upsert: true },
      (err, result) => {
        if (err) return reject({ code: "400", isError: true, message: err });
        console.log("User updated with object id", _id);
        //resolve(result.value.obj);
        resolve({ code: "200", isError: false, message: "OK" });
      }
    );
  });
  return res;
}

module.exports = { updateAsset };
