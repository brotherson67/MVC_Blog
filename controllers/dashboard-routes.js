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
router.get("/edit/:id", Auth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
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
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render("edit-post", {
        post,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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
