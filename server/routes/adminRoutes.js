const express = require("express");
const router = express.Router();
const admin = require("../services/adminLogic");

router.post("/add", async (req, res) => {
  try {
    const token = req.header("Authorization");
    const result = await admin.addEmployee(req.body);
    res.json(result);
  } catch (err) {
    console.error("Unable to add employee: ", err);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

router.get("/employee", async (req, res) => {
  // 1) Pull the real query params out of req.query
  const { empid, fname, lname, ssn } = req.query;

  // 2) Grab the actual Authorization header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  // Sanity check — if empid is required, reject early
  if (!empid) {
    return res.status(400).json({ error: "empid is required" });
  }

  try {
    // 3) Pass the real query _object_ and the real token
    const employee = await admin.getEmployee(
      { empid, fname, lname, ssn },
      authHeader // <<< not the string "getEmployee"
    );
    res.json(employee);
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
    const token = req.header("Authorization");
    const result = await admin.updateEmployee(req.body);
    res.json(result);
  } catch (err) {
    console.error("Unable to update employee: ", err);
    res.status(500).json({ error: "Failed to update employee " });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const token = req.header("Authorization");
    const result = await admin.removeEmployee(req.body);
    res.json(result);
  } catch (err) {
    console.error("Failed to delete employee: ", err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

router.post("generatePayroll", async (req, res) => {
  try {
    const token = req.header("Authorization");
    const result = await admin.generatePayroll(req.body);
    res.json(result);
  } catch (err) {
    console.error("Unable to generate payroll: ", err);
    res.status(500).json({ error: "Failed to generate payroll" });
  }
});

module.exports = router;
