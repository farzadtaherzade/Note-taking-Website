const router = require("express").Router();
const { AuthController } = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");
const { checkValidaionErr } = require("../middleware/checkValidationError");

router.post(
  "/register",
  registerValidator(),
  checkValidaionErr,
  AuthController.register
);
router.post(
  "/login",
  loginValidator(),
  checkValidaionErr,
  AuthController.login
);

module.exports = {
  authRoutes: router,
};
