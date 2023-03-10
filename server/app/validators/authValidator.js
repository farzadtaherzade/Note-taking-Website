const { body } = require("express-validator");
const { UserModel } = require("../models/user");

const registerValidator = () => {
  return [
    body("firstname").notEmpty().withMessage("Pls tell us your first name"),
    body("lastname").notEmpty().withMessage("Pls tell us your last name"),
    body("email")
      .notEmpty()
      .withMessage("Pls tell us your email")
      .isEmail()
      .withMessage("The entered email in not correct")
      .custom(async (value, ctx) => {
        console.log("here");
        const result = await UserModel.findOne({ email: value });
        if (result) throw "User already exists";
        return true;
      }),
    body("password").notEmpty().withMessage("Password can't be empty"),
  ];
};
const loginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Pls tell us your email")
      .isEmail()
      .withMessage("The entered email in not correct"),
    body("password").notEmpty().withMessage("Password can't be empty"),
  ];
};

module.exports = {
  registerValidator,
  loginValidator,
};
