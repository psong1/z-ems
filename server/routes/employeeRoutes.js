const express = require("express");
const router = express.Router();
const emp = require("../services/employeeLogic");

router.get("/self", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Missing auth token" });
    }

    const data = await emp.getInfo(req.query.empid, token);
    res.json(data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data?.error || err.message });
  }
});

router.get("/payroll", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    console.error("  → Missing Authorization header in /payroll");
    return res.status(401).json({ error: "Missing auth token" });
  }
  try {
    const history = await emp.getPayrollHistory(req.query.empid, token);
    res.json(history);
  } catch (err) {
    console.error("  → Error fetching payroll history:", err.stack || err);
    const status = err.response?.status || 500;
    const msg = err.response?.data?.error || err.message;
    res.status(status).json({ error: msg });
  }
});

module.exports = router;
