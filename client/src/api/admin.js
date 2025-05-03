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

export async function getDivisions() {
  const res = await api.get("/admin/divisions");
  return res.data;
}

export async function getJobTitles() {
  const res = await api.get("/admin/job-titles");
  return res.data;
}

export async function getAllPayrollHistory() {
  const res = await api.get("/admin/payroll");
  return res.data;
}

export async function getTotalByJobTitle({ month, year, title }) {
  const res = await api.get(`/admin/payroll/job-title`, {
    params: {
      month,
      year,
      title,
    },
  });
  return res.data;
}

export async function getTotalByDivision({ month, year, division }) {
  const res = await api.get(`/admin/payroll/division`, {
    params: {
      month,
      year,
      division,
    },
  });
  return res.data;
}

export async function updateSalary({ percentage, minSalary, maxSalary }) {
  const res = await api.put("/admin/employees/salary", {
    percentage,
    minSalary,
    maxSalary,
  });
  return res.data;
}
