import axios from "../modules/axios";

export const logIn = ({ userName, password }) => {
  return axios.post("/login", { userName, password });
};

export const signUp = ({ username, password }) => {
  return axios.post("/signup", { username, password });
};
