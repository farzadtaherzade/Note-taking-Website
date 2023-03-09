const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      trim: true,
    },
    // date: {
    //   type: Date,
    //   default: new Date.now(),
    // },
    token: {
      type: String,
      required: false,
    },
    profile_image: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
