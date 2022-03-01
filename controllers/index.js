// Imports
const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboard-routes");
const apiRoutes = require("./api");

// Creating routes
router.use("/", homeRoutes);
router.use("/head", dashboardRoutes);
router.use("/api", apiRoutes);

// fallback route
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
