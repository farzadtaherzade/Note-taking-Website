class UserController {
  async getProfile(req, res, next) {
    try {
      const user = req.user;
      res.status(200).json({
        status: "success",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
