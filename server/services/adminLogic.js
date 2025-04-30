const axios = require("axios");
const JAVA_SERVER = process.env.LOCALHOST_API || "http://localhost:8080/api";

async function addEmployee(employeeData) {
  const result = await axios.post(JAVA_SERVER, null, {
    params: {
      action: "addEmployee",
      ...employeeData,
    },
  });
  return result.data;
}

async function getEmployee(empid) {
  const result = await axios.get(JAVA_SERVER, {
    params: { action: "getEmployee", empid },
  });
  return result.data;
}

async function updateEmployee(employeeData) {
  const result = await axios.post(JAVA_SERVER, null, {
    params: { action: "updateEmployee", ...employeeData },
  });
  return result.data;
}

async function removeEmployee(empid) {
  const result = await axios.post(JAVA_SERVER, null, {
    params: { action: "removeEmployee", empid },
  });
  return result.data;
}

async function generatePayroll({ empid, salary }) {
  const result = await axios.post(JAVA_SERVER, null, {
    params: { action: "generatePayroll", empid, salary },
  });
  return result.data;
}

module.exports = {
  addEmployee,
  getEmployee,
  updateEmployee,
  removeEmployee,
  generatePayroll,
};
