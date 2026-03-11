import axios from "axios";

const BASE = "http://localhost:5000/api/documents";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getDocuments = async () => {
  const res = await axios.get(BASE, { headers: authHeader() });
  return res.data;
};

export const createDocument = async (title) => {
  const res = await axios.post(BASE, { title }, { headers: authHeader() });
  return res.data;
};

export const deleteDocument = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`, { headers: authHeader() });
  return res.data;
};

export const getDocument = async (id) => {
  const res = await axios.get(`${BASE}/${id}`, { headers: authHeader() });
  return res.data;
};