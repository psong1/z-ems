require("dotenv").config();
const axios = require("axios");
const JAVA_API = process.env.JAVA_API;

async function getSelf(token) {
  const res = await axios.get(`${JAVA_API}/employee/self`, {
    headers: { Authorization: token },
  });
  return res.data;
}

async function getPayrollHistory(token) {
  const res = await axios.get(`${JAVA_API}/employee/payroll`, {
    headers: { Authorization: token },
  });
  return res.data;
}

module.exports = { getSelf, getPayrollHistory };
