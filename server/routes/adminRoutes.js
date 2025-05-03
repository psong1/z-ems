const express = require("express");
const admin = require("../services/adminLogic");
const router = express.Router();

// Auth helper
function requireAuth(req, res) {
  const auth = req.get("Authorization");
  if (!auth) {
    res.status(401).json({ error: "Missing token" });
    return null;
  }
  return auth;
}

// Create
router.post("/employees", async (req, res) => {
  const auth = requireAuth(req, res);
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

// Read
router.get("/employees/:empid", async (req, res) => {
  const auth = requireAuth(req, res);
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

router.put("/employees/salary", async (req, res) => {
  const auth = requireAuth(req, res);
  if (!auth) return;

  try {
    const { percentage, minSalary, maxSalary } = req.body;

    const result = await admin.updateSalary(
      percentage,
      minSalary,
      maxSalary,
      auth
    );

    res.json(result);
  } catch (err) {
    console.error("Unable to update salary range:", err);

    const status = err.response?.status || 500;
    res.status(status).json({
      error:
        err.response?.data?.error ||
        err.message ||
        "Failed to update salary range",
    });
  }
});

// Update
router.put("/employees/:empid", async (req, res) => {
  const auth = requireAuth(req, res);
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

// Delete
router.delete("/employees/:empid", async (req, res) => {
  const auth = requireAuth(req, res);
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

router.get("/payroll", async (req, res) => {
  const auth = requireAuth(req, res);
  if (!auth) return;
  try {
    const everything = await admin.getAllPayrollHistory(auth);
    res.json(everything);
  } catch (err) {
    console.error("Unable to fetch all payroll history:", err);
    res
      .status(err.response?.status || 500)
      .json({ error: err.message || "Failed to fetch all payroll history" });
  }
});

router.get("/payroll/job-title", async (req, res) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(401).json({ error: "Missing token" });

  const { month, year, title } = req.query;
  try {
    const totals = await admin.getTotalByJobTitle(
      parseInt(month, 10),
      parseInt(year, 10),
      title,
      auth
    );
    res.json(totals);
  } catch (err) {
    console.error("Unable to fetch totals by job title:", err);
    res
      .status(err.response?.status || 500)
      .json({ error: err.message || "Failed to fetch totals by job title" });
  }
});

router.get("/payroll/division", async (req, res) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(401).json({ error: "Missing token" });

  const { month, year, division } = req.query;
  try {
    const totals = await admin.getTotalByDivision(
      parseInt(month, 10),
      parseInt(year, 10),
      division,
      auth
    );
    res.json(totals);
  } catch (err) {
    console.error("Unable to fetch totals by division:", err);
    res
      .status(err.response?.status || 500)
      .json({ error: err.message || "Failed to fetch totals by division" });
  }
});

router.get("/job-titles", async (req, res) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(401).json({ error: "Missing token" });
  try {
    const list = await admin.getJobTitles(auth);
    res.json(list);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

router.get("/divisions", async (req, res) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(401).json({ error: "Missing token" });
  try {
    const list = await admin.getDivisions(auth);
    res.json(list);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

module.exports = router;
