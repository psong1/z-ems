// server/services/employeeLogic.js
const axios = require("axios");
const JAVA_API = process.env.JAVA_API || "http://localhost:8080/api";

async function getInfo(empid, token) {
  const resp = await axios.get(`${JAVA_API}/employee`, {
    params: { action: "getSelf", empid },
    headers: { Authorization: token },
  });
  return resp.data;
}

async function getPayrollHistory(empid, token) {
  // this must be exactly the same as getInfo, just different action
  const resp = await axios.get(`${JAVA_API}/employee`, {
    params: { action: "getPayrollHistory", empid },
    headers: { Authorization: token },
  });
  return resp.data;
}

module.exports = { getInfo, getPayrollHistory };
