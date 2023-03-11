const mongoose = require("mongoose");
const { NoteModel } = require("../models/note");

class NoteController {
  async findAllNote(req, res, next) {
    try {
      const { _id } = req.user;
      const notes = await NoteModel.find({ author: _id });
      return res.status(200).json({
        status: "success",
        length: notes.length,
        notes,
      });
    } catch (error) {
      next(error);
    }
  }
  async findAllNoteByCollection(req, res, next) {
    try {
      const { _id } = req.user;
      const collection = req?.params?.collection;
      const notes = await NoteModel.find({ collection, author: _id });
      res.status(200).json({
        status: "success",
        length: notes.length,
        notes,
      });
    } catch (error) {
      next(error);
    }
  }
  async findNoteById(req, res, next) {
    try {
      const id = req?.params?.id;
      const note = await NoteModel.findById(id);
      if (!note) {
        return res.status(404).json({
          status: "fail",
          message: "Not Found",
        });
      }
      return res.status(200).json({
        status: "success",
        note,
      });
    } catch (error) {
      next(error);
    }
  }
  async createNote(req, res, next) {
    try {
      const { title, description, color } = req.body;
      const { _id } = req.user;
      const result = await NoteModel.create({
        title,
        description,
        color: color === "" || color === null ? "FF99BB" : color,
        author: _id,
      }).catch((err) => {
        if (err) throw { status: 400, message: err };
      });

      return res.status(201).json({
        status: "success",
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateNote(req, res, next) {
    try {
      const { title, description, color } = req.body;
      const _id = req.params?.id;
      const author = req.user._id;

      const note = await NoteModel.findOne({ _id, author });
      if (!note) throw { status: 404, message: "Not Found" };

      const result = await NoteModel.findOneAndUpdate(
        { _id, author },
        {
          $set: {
            title,
            description,
            color: color === "" || color === null ? note.color : color,
          },
        }
      );
      if (result.modifiedCount == 0) {
        return res.status(400).json({
          status: "fail",
          message: "updated error",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Note successfully updated",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteNote(req, res, next) {
    try {
      const _id = req.params.id;
      const author = req.user._id;

      const note = await NoteModel.findOne({ _id, author });
      if (!note) throw { status: 404, message: "Not Found" };

      const result = await NoteModel.findOneAndDelete({ _id, author });
      if (result.deletedCount == 1) {
        return res.status(400).json({
          status: "fail",
          message: "error",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Note successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  NoteController: new NoteController(),
};
