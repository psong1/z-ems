require("dotenv").config();
const axios = require("axios");
const JAVA_API = process.env.JAVA_API;
console.log("JAVA_API is:", JAVA_API);

async function addEmployee(employeeData, token) {
  const url = `${JAVA_API}/admin`;
  const response = await axios.post(url, null, {
    params: { action: "addEmployee", ...employeeData },
    headers: { Authorization: token },
  });
  return response.data;
}

async function getEmployee(query, token) {
  const url = `${JAVA_API}/admin`;
  const response = await axios.get(url, {
    params: { action: "getEmployee", ...query },
    headers: { Authorization: token },
  });
  return response.data;
}

async function updateEmployee(employeeData, token) {
  const url = `${JAVA_API}/admin`;
  const response = await axios.post(url, null, {
    params: { action: "updateEmployee", ...employeeData },
    headers: { Authorization: token },
  });
  return response.data;
}

async function removeEmployee(empid, token) {
  const url = `${JAVA_API}/admin`;
  const response = await axios.post(url, null, {
    params: { action: "removeEmployee", empid },
    headers: { Authorization: token },
  });
  return response.data;
}

async function generatePayroll({ empid, salary }, token) {
  const url = `${JAVA_API}/admin`;
  const response = await axios.post(url, null, {
    params: { action: "generatePayroll", empid, salary },
    headers: { Authorization: token },
  });
  return response.data;
}

module.exports = {
  addEmployee,
  getEmployee,
  updateEmployee,
  removeEmployee,
  generatePayroll,
};
