const express = require("express");
const admin = require("../services/adminLogic");
const router = express.Router();

router.post("/employees", async (req, res) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(401).json({ error: "Missing token" });
  try {
    const newEmp = await admin.addEmployee(req.body, auth);
    res.status(201).json(newEmp);
  } catch (err) {
    console.error("Unable to add employee:", err);
    res
      .status(err.response?.status || 500)
      .json({ error: err.message || "Failed to add employee" });
  }
});

router.get("/employees/:empid", async (req, res) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(401).json({ error: "Missing token" });
  try {
    const emp = await admin.getEmployee(req.params.empid, auth);
    res.json(emp);
  } catch (err) {
    console.error("Unable to get employee:", err);
    const status = err.response?.status || 500;
    res.status(status).json({ error: err.message || "Failed to get employee" });
  }
});

router.put("/employees/:empid", async (req, res) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(401).json({ error: "Missing token" });
  try {
    const updated = await admin.updateEmployee(
      req.params.empid,
      req.body,
      auth
    );
    res.json(updated);
  } catch (err) {
    console.error("Unable to update employee:", err);
    const status = err.response?.status || 500;
    res
      .status(status)
      .json({ error: err.message || "Failed to update employee" });
  }
});

router.delete("/employees/:empid", async (req, res) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(401).json({ error: "Missing token" });
  try {
    await admin.deleteEmployee(req.params.empid, auth);
    res.status(204).end();
  } catch (err) {
    console.error("Unable to delete employee:", err);
    const status = err.response?.status || 500;
    res
      .status(status)
      .json({ error: err.message || "Failed to delete employee" });
  }
});

router.post("/employees/:empid/payroll", async (req, res) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(401).json({ error: "Missing token" });
  try {
    const { salary } = req.body;
    const result = await admin.generatePayroll(req.params.empid, salary, auth);
    res.json(result);
  } catch (err) {
    console.error("Unable to generate payroll:", err);
    res
      .status(err.response?.status || 500)
      .json({ error: err.message || "Failed to generate payroll" });
  }
});

module.exports = router;
