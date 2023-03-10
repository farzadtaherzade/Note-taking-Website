const { authRoutes } = require("./auth");
const { noteRoutes } = require("./note");
const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/note", noteRoutes);

module.exports = {
  allRoutes: router,
};
