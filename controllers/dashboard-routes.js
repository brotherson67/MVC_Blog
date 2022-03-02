const { Comment, Post, User } = require("../model");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const router = require("express").Router();

// GET /dashboard
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("======================");
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /dashboard/:id
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((dbPostData) => {});
});

router.get("/create/", Auth, (req, res) => {
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
      res.render("create-post", { posts, loggedIn: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
