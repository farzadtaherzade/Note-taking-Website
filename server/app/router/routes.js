const { authRoutes } = require("./auth");
const { noteRoutes } = require("./note");
const { userRoutes } = require("./user");
const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/note", noteRoutes);
router.use("/user", userRoutes);

module.exports = {
  allRoutes: router,
};
