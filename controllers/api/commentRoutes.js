const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { User, Comment } = require("../../model");

// get all the comments
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Comment.findOne({ id: req.params.id })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => res.status(400).json(err));
});

router.post("/", withAuth, async (req, res) => {
  if (req.session) {
    Comment.create({
      commentText: req.body.commentText,
      post_id: req.body.post_id,
      user_id: req.body.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => res.status(400).json(err));
  }
});

module.exports = router;
