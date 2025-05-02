const express = require("express");
const router = express.Router();
const auth = require("../services/authLogic");

router.post("/login", async (req, res) => {
  try {
    const result = await auth.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});
module.exports = router;
