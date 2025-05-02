import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function login(email, password) {
  const { data } = await axios.post(`${API}/auth/login`, { email, password });
  if (data.authenticated) {
    localStorage.setItem("jwt", data.token);
  }
  return data;
}
