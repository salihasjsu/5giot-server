const { getDBConnection } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-express");

async function updateUser(
  root,
  {
    _id,
    userName,
    email,
    role,
    password,
    firstName,
    lastName,
    address,
    contactNumber,
  }
) {
  console.log("going to updare user");
  let validationErrors = {};
  if (userName.length == 0) validationErrors.userName = "userName is required";
  if ((email.length = 0)) validationErrors.email = "email is required";
  if (Object.keys(validationErrors).length > 0)
    throw new UserInputError(
      "Post update failed due to incorrect data. Please correct the below fields before proceeding.",
      validationErrors
    );
  const userCollection = getDBConnection().collection("users");
  var myquery = { _id: _id };
  var obj = {
    _id: _id,
    userName: userName,
    email: email,
    role: role,
    password: password,
    firstName: firstName,
    lastName: lastName,
    address: address,
    contactNumber: contactNumber,
  };
  let res = await new Promise((resolve, reject) => {
    userCollection.findOneAndUpdate(
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

module.exports = { updateUser };
