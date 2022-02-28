// HomeRoutes is what directs to the different handlebars files
const router = require("express").Router();
const sequelize = require("../config/connection");
const { blogPosts } = require("../model");

router.get("/", async (req, res) => {
  try {
    const response = await Post.findAll({
      attributes: ["id", "title", "content", "user_id", "createdAt"],
    });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
