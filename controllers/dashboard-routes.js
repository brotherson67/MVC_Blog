const { Comment, Post, User } = require("../model");
const Auth = require("../utils/auth");
const sequelize = require("../config/connection");
const router = require("express").Router();

// GET /dashboard
router.get("/", Auth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "post_body"],
    include: [
      {
        model: Comment,
        attributes: ["id", "commentText", "post_id", "user_id"],
      },
    ],
  })
    .then((dbPostData) => {
      // serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET /dashboard/:id
router.get("/:id", Auth, async (req, res) => {
  const response = await Post.findOne({
    where: { id: req.params.id },
    attributes: ["id", "title", "content", "user_id", "createdAt"],
    include: [{ model: User }, { model: Comment }],
  });
  if (!response) {
    res.status(404);
  }
  const post = response.get({ plain: true });
  res.render("dashboard-post", { post, loggedIn: req.session.loggedIn });
});

module.exports = router;
