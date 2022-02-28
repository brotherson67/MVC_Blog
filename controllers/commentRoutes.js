const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Comment } = require("../models");

// get all the comments
router.get("/", async (req, res) => {
  try {
    const response = await Comment.findAll({
      attributes: ["id", "content", "post_id", "user_id", "createdAt"],
      include: { model: User, attributes: ["username"] },
    });
    res.json(response);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
