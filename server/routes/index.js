const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoute"));
router.use("/admin", require("./adminRoutes"));
router.use("/employee", require("./employeeRoutes"));

module.exports = router;
