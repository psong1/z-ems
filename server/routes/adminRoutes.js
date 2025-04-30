const express = require("express");
const router = express.Router();
const admin = require("../services/adminLogic");

router.post("/add", async (req, res) => {
  try {
    const result = await admin.addEmployee(req.body);
    res.json(result);
  } catch (err) {
    console.error("Unable to add employee: ", err);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

router.get("/employee", async (req, res) => {
  try {
    const result = await admin.getEmployee(req.query.empid);
    res.json(result);
  } catch (err) {
    console.error("Unable to get employee: ", err);
    res.status(500).json({ error: "Failed to get employee " });
  }
});

router.post("/update", async (req, res) => {
  try {
    const result = await admin.updateEmployee(req.body);
    res.json(result);
  } catch (err) {
    console.error("Unable to update employee: ", err);
    res.status(500).json({ error: "Failed to update employee " });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const result = await admin.removeEmployee(req.body);
    res.json(result);
  } catch (err) {
    console.error("Failed to delete employee: ", err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

router.post("generatePayroll", async (req, res) => {
  try {
    const result = await admin.generatePayroll(req.body);
    res.json(result);
  } catch (err) {
    console.error("Unable to generate payroll: ", err);
    res.status(500).json({ error: "Failed to generate payroll" });
  }
});

module.exports = router;
