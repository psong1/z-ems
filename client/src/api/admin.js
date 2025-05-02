import api from "./client";

export async function addEmployee(employeeData) {
  const res = await api.post("/admin/employees", employeeData);
  return res.data;
}

export async function getEmployee(empid) {
  const res = await api.get(`/admin/employees/${empid}`);
  return res.data;
}

export async function updateEmployee(empid, employeeData) {
  const res = await api.put(`/admin/employees/${empid}`, employeeData);
  return res.data;
}

export async function deleteEmployee(empid) {
  const res = await api.delete(`/admin/employees/${empid}`);
  return res.data;
}

export async function generatePayroll(empid, salary) {
  const res = await api.post(`/admin/employees/${empid}/payroll`, { salary });
  return res.data;
}
