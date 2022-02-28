// Imports
const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const commentRoutes = require("./commentRoutes");
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const dashboardRoutes = require("./dashboard-routes");

// Creating routes
router.use("/", homeRoutes);
router.use("/blog", blogRoutes);
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/head", dashboardRoutes);

// fallback route
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
