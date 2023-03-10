const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

exports.checkLogin = async (req, res, next) => {
  try {
    const err = { status: 401, message: "Please login to your account" };
    const auth = req.headers?.authorization;
    if (!auth) throw err;
    const token = auth.split(" ")?.[1];
    if (!token) throw err;
    const result = jwt.verify(token, process.env.SECRET);
    const { email } = result;
    if (!email) throw err;
    const user = await UserModel.findOne({ email });
    if (!user) throw err;
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};
