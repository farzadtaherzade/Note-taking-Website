const router = require("express").Router();
const { AuthController } = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

router.post("/register", registerValidator(), AuthController.register);
router.post("/login", loginValidator(), AuthController.login);

module.exports = {
  authRoutes: router,
};
