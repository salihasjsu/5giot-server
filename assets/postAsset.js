const { getDBConnection } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-express");

async function addAsset(root, { _id, name, manufacturer, imei, status }) {
  console.log("going to add asset");
  const assetCollection = getDBConnection().collection("assets");
  let res = null;
  res = await new Promise((resolve, reject) => {
    assetCollection.insertOne(
      {
        _id,
        name,
        manufacturer,
        imei,
        status,
      },
      {},
      (err, result) => {
        if (err)
          return reject({
            code: "400",
            isError: true,
            message: "error adding asset",
          });
        //resolve(result.ops[0]);
        console.log(result);
        resolve({ code: "200", isError: false, message: result.ops[0]._id });
      }
    );
  });
  return res;
}

module.exports = { addAsset };
