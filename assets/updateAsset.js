const { getDBConnection } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-koa");

async function updateAsset(
  root,
  { _id, name, model, manufactureId, manufactureDate }
) {
  console.log("going to updare user");
  let validationErrors = {};
  if (name.length == 0) validationErrors.userName = "name is required";
  if ((model.length = 0)) validationErrors.email = "model is required";
  if (Object.keys(validationErrors).length > 0)
    throw new UserInputError(
      "Post update failed due to incorrect data. Please correct the below fields before proceeding.",
      validationErrors
    );
  const assetCollection = getDBConnection().collection("assets");
  var myquery = { _id: _id };
  var obj = {
    _id,
    name,
    model,
    manufactureId,
    manufactureDate,
  };
  let res = await new Promise((resolve, reject) => {
    assetCollection.findOneAndUpdate(
      {
        myquery,
      },
      { $set: { obj } },
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
