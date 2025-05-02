// server/services/authLogic.js
const axios = require("axios");
require("dotenv").config();

const JAVA_API = process.env.JAVA_API || "http://localhost:8080/api/auth";

async function login(email, password) {
  const url = `${JAVA_API}/auth`;
  console.log("Calling Javalin auth at:", url);
  const response = await axios.post(url, null, {
    params: { action: "login", email, password },
  });
  return response.data;
}

module.exports = { login };
