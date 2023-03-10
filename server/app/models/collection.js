const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
});

const CollectionModel = mongoose.model("Collection", NoteSchema);

module.exports = {
    CollectionModel,
};
