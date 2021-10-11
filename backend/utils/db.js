const mongoose = require("mongoose");
const url = process.env.DB;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect
  .then((db) => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
