const express = require("express");
const router = express.Router();
const emp = require("../services/employeeLogic");

router.get("/self", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  try {
    const data = await emp.getSelf(token);
    res.json(data);
  } catch (err) {
    console.error("→ Error fetching employee info:", err.stack || err);
    const status = err.response?.status || 500;
    const msg = err.response?.data?.error || err.message;
    res.status(status).json({ error: msg });
  }
});

router.get("/payroll", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  try {
    const history = await emp.getPayrollHistory(token);
    res.json(history);
  } catch (err) {
    console.error("→ Error fetching payroll history:", err.stack || err);
    const status = err.response?.status || 500;
    const msg = err.response?.data?.error || err.message;
    res.status(status).json({ error: msg });
  }
});

module.exports = router;
