const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  image: { type: String },
  isDone: { type: Boolean, required: false },
});

module.exports = mongoose.model("Todo", TodoSchema);
