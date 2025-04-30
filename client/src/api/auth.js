import axios from "axios";

export async function login({ email, password }) {
  const res = await axios.post("/api/auth/login", {
    email,
    password,
  });
  return res.data;
}
