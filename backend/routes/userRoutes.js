const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

//---------------------------Login-------------------

router.post("/signup", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({
        title: "Error",
        error: "Invalid email",
      });
    }
    return res.status(200).json({
      title: "User created successfully",
    });
  });
});

//---------------------------Login-------------------

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (!user) {
      return res.status(400).json({
        title: "User is not found",
        error: "Invalid userName or password",
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "login failed",
        error: "invalid userName or password",
      });
    }
    let token = jwt.sign({ userId: user._id }, "secretkey");
    res.json({
      title: "Login successful",
      token: token,
    });
  });
});

module.exports = router;
