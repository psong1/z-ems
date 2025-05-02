// client/src/api/client.js
import axios from "axios";
const API = import.meta.env.VITE_API_URL; // "http://localhost:3001/api"

const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
