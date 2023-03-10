const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      required: true,
    },
    description: {
      type: String,
      maxLength: 255,
      required: true,
    },
    color: {
      type: String,
      minLength: 3,
      maxLength: 6,
      default: "FF99BB",
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = {
  NoteModel,
};
