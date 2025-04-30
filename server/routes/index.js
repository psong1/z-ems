const express = require("express");
const authRoute = require("./authRoute");
const adminRoutes = require("./adminRoutes");
const empRoutes = require("./employeeRoutes");

const router = express.Router();
router.use("/auth", authRoute);
router.use("/admin", adminRoutes);
router.use("/employee", empRoutes);
module.exports = router;
