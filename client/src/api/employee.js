import axios from "axios";

export async function getInfo(empid) {
  const res = await axios.get("/api/employee", {
    params: { action: "getInfo", empid },
  });
  return res.data;
}

export async function getPayrollHistory(empid) {
  const res = await axios.get("/api/employee", {
    params: { action: "getPayrollHistory", empid },
  });
  return res.data;
}
