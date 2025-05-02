require("dotenv").config();
const axios = require("axios");
const JAVA_API = process.env.JAVA_API;

async function addEmployee(data, token) {
  const response = await axios.post(`${JAVA_API}/admin/employees`, data, {
    headers: { Authorization: token },
  });
  return response.data;
}

async function getEmployee(id, token) {
  const response = await axios.get(`${JAVA_API}/admin/employees/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
}

async function updateEmployee(id, data, token) {
  const response = await axios.put(`${JAVA_API}/admin/employees/${id}`, data, {
    headers: { Authorization: token },
  });
  return response.data;
}

async function deleteEmployee(id, token) {
  const response = await axios.delete(`${JAVA_API}/admin/employees/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
}

async function generatePayroll(id, salary, token) {
  const response = await axios.post(
    `${JAVA_API}/admin/employees/${id}/payroll`,
    { salary },
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
}

module.exports = {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  generatePayroll,
};
