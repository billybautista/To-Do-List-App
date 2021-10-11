const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

// Devuelve todas las task sin completar del usuario
router.get("/todos", (req, res) => {
  jwt.verify(req.headers.token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });
    Todo.find({ author: decoded.userId, isDone: false }, (err, todos) => {
      if (err) return console.log(err);
      return res.status(200).json(todos);
    });
  });
});

// Devuelve todas las task completadas del usuario
router.get("/todos/done", (req, res) => {
  jwt.verify(req.headers.token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });
    Todo.find({ author: decoded.userId, isDone: true }, (err, todo) => {
      if (err) return console.log(err);
      return res.status(200).json(todo);
    });
  });
});

// Agrega una tarea del usuario
router.post("/todos", (req, res) => {
  jwt.verify(req.headers.token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });
    let newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      isDone: false,
      author: decoded.userId,
    });
    newTodo.save((error) => {
      if (error) return console.log(error);
      return res.status(200).json({
        title: "successfully added",
        todo: newTodo,
      });
    });
  });
});

// Edita la card
router.put("/todo/:id", (req, res) => {
  jwt.verify(req.headers.token, "secretkey", (err) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });
    const { title, image, description } = req.body;
    const { id } = req.params;
    Todo.findByIdAndUpdate(
      { _id: id },
      { title: title, description: description, image: image }
    ).then((r) => {
      res.json(r);
    });
  });
});

// Elimina la card
router.delete("/todo/:id", async (req, res) => {
  jwt.verify(req.headers.token, "secretkey", (err) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });
    const { id } = req.params;
    Todo.findOneAndRemove(id).then((r) => {
      res.json(r);
    });
  });
});

// Marca como completada la tarea
router.put("/todo/done/:id", (req, res) => {
  jwt.verify(req.headers.token, "secretkey", (err) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });
    const { id } = req.params;
    Todo.findByIdAndUpdate({ _id: id }, req.body).then((r) => {
      res.json(r);
    });
  });
});

// Trae la data de una sola  tarea
router.get("/todo/:id", (req, res) => {
  jwt.verify(req.headers.token, "secretkey", (err) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });
    const { id } = req.params;
    Todo.findById(id).then((todo) => {
      res.json(todo);
    });
  });
});

module.exports = router;
