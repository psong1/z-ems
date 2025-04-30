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
  const { empid, fname, lname, ssn } = req.query;

  try {
    const result = await admin.getEmployee({ empid, fname, lname, ssn });
    res.json(result);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: "Employee not found" });
    }
    console.error("Unable to get employee:", err);
    res.status(500).json({ error: "Failed to get employee" });
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
