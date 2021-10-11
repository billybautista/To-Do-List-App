import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import TodoCard from "../components/TodoCard";
import {
  postTask,
  deleteTask,
  getAllTask,
  changeCheckbox,
  getDone,
  getTaskById,
  editTaskById,
} from "../services/task";

function Home() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const changeBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
    setImage("");
  };

  const getTodo = () => {
    getAllTask().then((data) => {
      setTodos(data);
    });
  };

  const getDoneTodo = () => {
    getDone().then((data) => {
      setDone(data);
    });
  };

  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      deleteTask(id);
      setId("");
      getTodo();
    }
    setId("");
    getTodo();
  };

  const addToDo = (e) => {
    if (id) {
      editTaskById(id, { title, description, image });
      setId("");
      setTitle("");
      setDescription("");
      setImage("");
      document.getElementById("image").value = "";
      getTodo();
    } else {
      if (title == "") {
        alert("Please enter a title");
      } else {
        const todo = {
          title: title,
          description: description,
          image: image,
          isDone: false,
        };
        postTask(todo);
        setTitle("");
        setDescription("");
        setImage("");
        setId("");
        document.getElementById("image").value = "";
        e.preventDefault();
        getTodo();
      }
    }
  };

  const cancelToDo = (e) => {
    setId("");
    setTitle("");
    setDescription("");
    setImage("");
    document.getElementById("image").value = "";
    e.preventDefault();
  };

  const tasks =
    todos.data !== undefined && todos.data.length > 0
      ? todos.data.filter((e) => e.isDone === false)
      : null;

  const dones =
    done.data !== undefined && done.data.length > 0
      ? done.data.filter((e) => e.isDone === true)
      : null;

  const editTodo = (id) => {
    getTaskById(id).then(({ data }) => {
      setId(data._id);
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
    });
  };

  const changeDone = (id) => {
    setIsDone(true);
    changeCheckbox(id, { isDone: isDone });
    getDoneTodo();
    getTodo();
  };

  useEffect(() => {
    getTodo();
    getDoneTodo();
  }, []);

  return (
    <div>
      <Nav />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <div
          style={{
            width: 350,
            padding: 30,
            border: "1px solid #247DEF",
            borderRadius: 20,
          }}
        >
          <h4>New Task</h4>
          <div style={{ height: 20 }} />
          <div>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Title"
              className="mb-3"
            >
              <Form.Control
                as="input"
                placeholder="Leave a comment here"
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                value={title}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "60px" }}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                value={description}
              />
            </FloatingLabel>
            <div style={{ height: 20 }} />
            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                name="image"
                id="image"
                onChange={changeBase64}
                accept="image/png, .jpeg, .jpg, image/gif"
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {image && <img src={image} alt="chose" style={{ height: 120 }} />}
            </div>
            <div style={{ height: 20 }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="primary" onClick={addToDo}>
                Agregar Tarea
              </Button>
              <div style={{ width: 20 }} />
              {title !== "" || description !== "" ? (
                <Button variant="secondary" onClick={cancelToDo}>
                  Cancelar Tarea
                </Button>
              ) : null}

              <div style={{ height: 20 }} />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 30,
        }}
      >
        <div style={{ margin: 20 }}>
          <h1>To do</h1>
          <div style={{ height: 10 }} />
          {tasks && tasks
            ? tasks.map((e) => (
                <TodoCard
                  key={e._id}
                  title={e.title}
                  description={e.description}
                  deleteCard={() => deleteTodo(e._id)}
                  editCard={() => editTodo(e._id)}
                  checked={e.isDone}
                  isDone={() => changeDone(e._id)}
                  img={e.image}
                />
              ))
            : null}
        </div>
        <div style={{ margin: 20 }}>
          <h1>Done</h1>
          <div style={{ height: 10 }} />
          {dones && dones
            ? dones.map((e) => (
                <TodoCard
                  key={e._id}
                  title={e.title}
                  description={e.description}
                  deleteCard={() => deleteTodo(e._id)}
                  editCard={() => editTodo(e._id)}
                  checked={e.isDone}
                  disabled={true}
                  img={e.image}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
