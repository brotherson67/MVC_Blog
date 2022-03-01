const router = require("express").Router();
const { User, Comment, blogPost } = require("../../model");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

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
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", async (req, res) => {
  try {
    const response = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "title", "content", "user_id", "createdAt"],
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: { model: User } },
      ],
    });
    if (!response) {
      res.status(404).json;
      return;
    }
    const post = response.get({ plain: true });
    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn,
      home: true,
    });
  } catch (err) {
    res.status(500);
  }
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
