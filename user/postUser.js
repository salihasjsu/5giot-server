const { getDBConnection } = require("../dbAdapter");
const { UserInputError } = require("apollo-server-express");
const { setTokens } = require("../shared/setTokens");
const userSchema = require("./userSchema");
const { encrypt, decrypt } = require("../shared/encryption");
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
  password = encrypt(password);
  const userCollection = getDBConnection().collection("users");
  let res = null;
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
  console.info("trying to login");
  const userCollection = getDBConnection().collection("users");
  let tokens = await userCollection
    .findOne({ userName: userName }, {})
    .then((res) => {
      if (!res) return null;
      //if (!bcrypt.compareSync(password, res.password)) return null;
      if (!(password === decrypt(res.password))) return null;
      return setTokens(res);
    });

  return tokens;
}
module.exports = { addUser, login };
