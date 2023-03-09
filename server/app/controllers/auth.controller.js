const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user");
const { hashString, signToken } = require("../utils/modules");

class AuthController {
  async register(req, res, next) {
    try {
      console.log("daspjd");

      const { firstname, lastname, email, password } = req.body;
      const hashPassword = hashString(password);
      const user = await UserModel.create({
        firstname,
        lastname,
        email,
        password: hashPassword,
      }).catch((err) => {
        if (err) throw { status: 400, message: err };
      });

      return res.status(201).json({
        status: "success",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const err = {
        status: 401,
        message: "Email or password not correct",
      };
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) throw err;
      const comparePasswrod = bcrypt.compareSync(password, user.password);
      if (!comparePasswrod) throw err;

      const token = signToken({ _id: user._id, email: user.email });
      user.token = token;
      await user.save();
      return res.status(200).json({
        status: "success",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req, res, next) {}
}

module.exports = {
  AuthController: new AuthController(),
};
