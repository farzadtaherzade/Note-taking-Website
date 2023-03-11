const router = require("express").Router();
const { UserController } = require("../controllers/user.controller");
const { checkLogin } = require("../middleware/authorization");

router.get("/me", checkLogin, UserController.getProfile);

module.exports = {
  userRoutes: router,
};
