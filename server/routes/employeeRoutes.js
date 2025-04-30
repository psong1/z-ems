const express = require("express");
const router = express.Router();
const employee = require("../services/employeeLogic");

router.get("/self", async (req, res) => {
  try {
    const result = await employee.getInfo(req.query.empid);
    res.json(result);
  } catch (err) {
    console.error("Unable to fetch employee data: ", err);
    res.status(500).json({ error: "Failed to fetch employee data" });
  }
});

router.get("/payroll", async (req, res) => {
  try {
    const result = await employee.getPayrollHistory(req.query.empid);
    res.json(result);
  } catch (err) {
    console.error("Unable to get payroll history: ", err);
    res.status(500).json({ error: "Failed to get payroll history" });
  }
});

module.exports = router;
