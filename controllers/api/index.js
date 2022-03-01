const router = require("express").Router();

const commentRoutes = require("./commentRoutes");
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");

router.use("/blog", blogRoutes);
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
