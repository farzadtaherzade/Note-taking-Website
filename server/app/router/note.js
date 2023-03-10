const router = require("express").Router();
const { NoteController } = require("../controllers/note.controller");
const { checkLogin } = require("../middleware/authorization");
const { checkValidaionErr } = require("../middleware/checkValidationError");
const { createNoteValidator } = require("../validators/noteValidator");

router.get("/find-note", checkLogin, NoteController.findAllNote);
router.get(
  "/find-note-collection",
  checkLogin,
  NoteController.findAllNoteByCollection
);
router.get("/find-note/:id", checkLogin, NoteController.findNoteById);
router.post(
  "/create-note",
  checkLogin,
  createNoteValidator(),
  checkValidaionErr,
  NoteController.createNote
);
router.put("/update-note/:id", checkLogin, NoteController.updateNote);
router.delete("/delete-note/:id", checkLogin, NoteController.deleteNote);

module.exports = {
  noteRoutes: router,
};
