const axios = require("axios");

const JAVA_SERVER = process.env.LOCALHOST_API;

async function login({ email, password }) {
  const result = await axios.post(JAVA_SERVER, null, {
    params: {
      action: "login",
      email,
      password,
    },
  });
  return result.data;
}

module.exports = { login };
