const axios = require("axios");

const JAVA_SERVER = process.env.LOCALHOST_API;

async function addEmployee(employeeData) {
  const result = await axios.post(JAVA_SERVER, null, {
    params: {
      action: "addEmployee",
      ...employeeData,
    },
  });
  return result.data;
}

async function getEmployee({ empid, fname, lname, ssn }) {
  const params = { action: "getEmployee" };
  if (empid !== undefined) params.empid = empid;
  if (fname) params.fname = fname;
  if (lname) params.lname = lname;
  if (ssn) params.ssn = ssn;

  const result = await axios.get(JAVA_SERVER, { params });
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
