const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const morgan = require("morgan");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { mongoose } = require("./utils/db");
const userRouter = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");

//Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/", todoRouter);
app.use("/", userRouter);

// Settings
app.set("port", port);

app.listen(app.get("port"), (err) => {
  if (err) return console.log(err);
  console.log("Server running on port: ", port);
});
