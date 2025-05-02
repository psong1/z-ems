import api from "./client";

export async function getInfo(empid) {
  const response = await api.get("/employee/self", {
    params: { empid },
  });
  return response.data;
}

// employee.js
export async function getPayrollHistory(empid) {
  const { data } = await api.get("/employee/payroll", {
    params: { empid, action: "getPayrollHistory" },
    withCredentials: true,
  });
  console.log("Payroll history JSON:", data);
  return data;
}
