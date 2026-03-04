import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getProfile = () => API.get("/users/profile");

export const updateProfile = (data) =>
  API.put("/users/profile", data);

export const changePassword = (data) =>
  API.put("/users/change-password", data);