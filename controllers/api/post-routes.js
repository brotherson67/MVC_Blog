const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
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
router.post("/", Auth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_body,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", Auth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.post_body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
