const { body } = require("express-validator");
const { NoteModel } = require("../models/note");

const createNoteValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Pls enter your title note")
      .custom(async (value, ctx) => {
        const note = await NoteModel.findOne({
          title: value,
          author: ctx.req.user,
        });
        if (note) throw "Note already exits";
        return true;
      }),
    body("description")
      .notEmpty()
      .withMessage("Pls enter your description note"),
  ];
};

module.exports = {
  createNoteValidator,
};
