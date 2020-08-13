const { getDBConnection } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const { setTokens } = require("../shared/setTokens");
const userSchema = require("./userSchema");
const saltRounds = 10;

async function addUser(
  root,
  {
    _id,
    userName,
    email,
    password,
    role,
    firstName,
    lastName,
    address,
    contactNumber,
  }
) {
  console.log("going to add user");
  let validationErrors = {};
  if (userName.length == 0) validationErrors.userName = "userName is required";
  if ((email.length = 0)) validationErrors.email = "email is required";
  if (Object.keys(validationErrors).length > 0)
    throw new UserInputError(
      "Post update failed due to incorrect data. Please correct the below fields before proceeding.",
      validationErrors
    );
  /* Hashing the password */
  let hash = bcrypt.hashSync(password, saltRounds);
  password = hash;
  const userCollection = getDBConnection().collection("users");
  let res = null;
  let tokenCount = 7;
  res = await new Promise((resolve, reject) => {
    userCollection.insertOne(
      {
        _id,
        userName,
        email,
        password,
        role,
        firstName,
        lastName,
        address,
        contactNumber,
        tokenCount,
      },
      {},
      (err, result) => {
        if (err)
          return reject({
            code: "400",
            isError: true,
            message: "username exists",
          });
        //resolve(result.ops[0]);
        // console.log(result);
        resolve({ code: "200", isError: false, message: "OK" });
      }
    );
  });
  return res;
}

async function login(root, { userName, password }) {
  console.info("going to get user");
  const userCollection = getDBConnection().collection("users");
  let user = await userCollection
    .findOne({ userName: userName }, {})
    .then((res) => {
      if (!res) return null;
      if (!bcrypt.compareSync(password, res.password)) return null;
      return res;
    });
  return setTokens(user);
}
module.exports = { addUser, login };
