const express = require("express");
const router = express.Router();
const auth = require("../services/authLogic");

router.post("/login", async (req, res) => {
  try {
    const result = await auth.login(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Invalid username or password" });
  }
});

module.exports = router;
