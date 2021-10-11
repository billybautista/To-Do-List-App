import axios from "../modules/axios";

export const postTask = (todo) => {
  return axios.post("http://localhost:5000/todos", todo, {
    headers: { token: localStorage.getItem("token") },
  });
};

export const deleteTask = (id) => {
  return axios.delete(`http://localhost:5000/todo/${id}`, {
    headers: { token: localStorage.getItem("token") },
  });
};

export const getAllTask = () => {
  return axios.get("http://localhost:5000/todos", {
    headers: { token: localStorage.getItem("token") },
  });
};

export const getDone = () => {
  return axios.get("http://localhost:5000/todos/done", {
    headers: { token: localStorage.getItem("token") },
  });
};

export const changeCheckbox = (id, done) => {
  return axios.put(`http://localhost:5000/todo/done/${id}`, done, {
    headers: { token: localStorage.getItem("token") },
  });
};

export const getTaskById = (id) => {
  return axios.get(`http://localhost:5000/todo/${id}`, {
    headers: { token: localStorage.getItem("token") },
  });
};

export const editTaskById = (id, task) => {
  return axios.put(`http://localhost:5000/todo/${id}`, task, {
    headers: { token: localStorage.getItem("token") },
  });
};
