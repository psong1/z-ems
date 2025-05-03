import api from "./client";

export async function getInfo(empid) {
  const response = await api.get("/employee/self", {
    params: { empid },
  });
  return response.data;
}

export async function getPayrollHistory(empid) {
  const { data } = await api.get("/employee/payroll", {
    params: { empid, action: "getPayrollHistory" },
    withCredentials: true,
  });

  return data;
}
