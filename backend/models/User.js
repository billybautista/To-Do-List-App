const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    unique: true,
    type: String,
  },
  password: String,
});

module.exports = mongoose.model("User", userSchema);
