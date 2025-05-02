import api from "./client";

const API = import.meta.env.VITE_API_URL;

export async function addEmployee(employeeData) {
  const res = await api.post("/admin/add", employeeData);
  return res.data;
}

export async function getEmployee({ empid, fname, lname, ssn }) {
  const res = await api.get("/admin/employee", {
    params: { empid, fname, lname, ssn },
  });
  return res.data;
}

export async function updateEmployee(employeeData) {
  const res = await api.post("/admin/update", employeeData);
  return res.data;
}

export async function deleteEmployee(empid) {
  const res = await api.post("/admin/delete", { empid });
  return res.data;
}

export async function generatePayroll({ empid, salary }) {
  const res = await api.post("/admin/generatePayroll", { empid, salary });
  return res.data;
}
