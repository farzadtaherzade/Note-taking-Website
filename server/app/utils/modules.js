const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.hashString = (str) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
};

exports.signToken = (payload) => {
  const token = jwt.sign(
    payload,
    process.env.SECRET
    /*{
    expiresIn: "365 Days",
  } */
  );
  return token;
};
