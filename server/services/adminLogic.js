require("dotenv").config();
const axios = require("axios");
const { response } = require("express");
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

async function getAllPayrollHistory(token) {
  const response = await axios.get(`${JAVA_API}/admin/payroll`, {
    headers: { Authorization: token },
  });
  return response.data;
}

async function getTotalByJobTitle(month, year, title, token) {
  const response = await axios.get(`${JAVA_API}/admin/payroll/job-title`, {
    params: { month, year, title },
    headers: { Authorization: token },
  });
  return response.data;
}

async function getTotalByDivision(month, year, division, token) {
  const response = await axios.get(`${JAVA_API}/admin/payroll/division`, {
    params: { month, year, division },
    headers: { Authorization: token },
  });
  return response.data;
}

async function getJobTitles(token) {
  const response = await axios.get(`${JAVA_API}/admin/job-titles`, {
    headers: { Authorization: token },
  });
  return response.data;
}

async function getDivisions(token) {
  const response = await axios.get(`${JAVA_API}/admin/divisions`, {
    headers: { Authorization: token },
  });
  return response.data;
}

async function updateSalary(percentage, minSalary, maxSalary, token) {
  const payload = { percentage, minSalary, maxSalary };
  const response = await axios.put(
    `${JAVA_API}/admin/employees/salary`,
    payload,
    { headers: { Authorization: token } }
  );
  return response.data;
}

module.exports = {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getAllPayrollHistory,
  getTotalByDivision,
  getTotalByJobTitle,
  getJobTitles,
  getDivisions,
  updateSalary,
};
