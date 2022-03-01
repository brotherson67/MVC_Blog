const router = require("express").Router();
const { User, Comment, blogPost } = require("../../model");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { resolve } = require("path/posix");

// GET /post/
router.get("/", (req, res) => {
  blogPost
    .findAll({
      attributes: ["id", "title", "user_id"],
      include: [
        { model: User, attributes: [username] },
        { model: Comment, attributes: ["commentText"] },
      ],
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  blogPost
    .findOne({
      where: { id: req.params.id },
      attributes: ["id", "title", "post_body", "user_id"],
      include: [
        { model: User, attributes: [username] },
        { model: Comment, attributes: ["commentText"] },
      ],
    })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "sorry no post found with that id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => res.status(500).json(err));
});

// POST
router.post("/", async (req, res) => {
  try {
    const response = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.json(response);
  } catch (err) {
    res.status(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await Post.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.params.id } }
    );
    if (!response) {
      res.status(404);
      return;
    }
    res.json(response);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
