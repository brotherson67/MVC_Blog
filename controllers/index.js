// Imports
const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboard-routes");
const apiRoutes = require("./api");

// Creating routes
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
