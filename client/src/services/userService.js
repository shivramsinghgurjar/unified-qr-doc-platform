import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice"; 

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

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout()); 
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const getProfile = () => API.get("/users/profile");

export const updateProfile = (data) =>
  API.put("/users/profile", data);

export const changePassword = (data) =>
  API.put("/users/change-password", data);