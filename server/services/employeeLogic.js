const axios = require("axios");
const JAVA_SERVER = process.env.LOCALHOST_API;

async function getInfo(empid) {
  const result = await axios.get(JAVA_SERVER, {
    params: {
      action: "getInfo",
      empid,
    },
  });
  return result.data;
}

async function getPayrollHistory(empid) {
  const result = await axios.get(JAVA_SERVER, {
    params: { action: "getPayrollHistory", empid },
  });
  return result.data;
}

module.exports = {
  getInfo,
  getPayrollHistory,
};
