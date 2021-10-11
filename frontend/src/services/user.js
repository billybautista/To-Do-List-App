import axios from "../modules/axios";

export const logIn = ({ username, password }) => {
  return axios.post("/login", { username, password });
};

export const signUp = ({ username, password }) => {
  return axios.post("/signup", { username, password });
};
