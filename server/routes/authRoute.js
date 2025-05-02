// server/routes/authRoute.js
const express = require("express");
const router = express.Router();
const auth = require("../services/authLogic");

router.post("/login", async (req, res) => {
  try {
    // req.body.email, req.body.password
    const result = await auth.login(req.body.email, req.body.password);
    // result now has { authenticated, empid, role, token }
    res.json(result);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});
module.exports = router;
