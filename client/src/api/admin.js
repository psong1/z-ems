import axios from "axios";

export async function addEmployee(employeeData) {
  const res = await axios.post("/api/admin/add", employeeData);
  return res.data;
}

export async function getEmployee(empid) {
  const res = await axios.get("/api/admin/employee", {
    params: { empid },
  });
  return res.data;
}

export async function updateEmployee(employeeData) {
  const res = await axios.post("/api/admin/update", employeeData);
  return res.data;
}

export async function deleteEmployee({ empid }) {
  const res = await axios.post("/api/admin/delete", { empid });
  return res.data;
}

export async function generatePayroll({ empid, salary }) {
  const res = await axios.post("/api/admin/generatePayroll", { empid, salary });
  return res.data;
}
