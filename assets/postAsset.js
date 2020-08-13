const { getDBConnection } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-koa");

async function addAsset(
  root,
  { _id, name, model, manufactureId, manufactureDate }
) {
  console.log("going to add asset");
  let validationErrors = {};
  if (name.length == 0) validationErrors.userName = "asset name is required";
  if ((model.length = 0)) validationErrors.email = "model is required";
  if (Object.keys(validationErrors).length > 0)
    throw new UserInputError(
      "Post asset failed due to incorrect data. Please correct the below fields before proceeding.",
      validationErrors
    );
  const assetCollection = getDBConnection().collection("assets");
  let res = null;
  res = await new Promise((resolve, reject) => {
    assetCollection.insertOne(
      {
        _id,
        name,
        model,
        manufactureId,
        manufactureDate,
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
        resolve({ code: "200", isError: false, message: "OK" });
      }
    );
  });
  return res;
}

module.exports = { addAsset };
