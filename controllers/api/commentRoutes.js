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

router.get("/:id", async (req, res) => {
  try {
    const response = await Comment.findOne({
      where: { id: req.params.id },
      attributes: ["id", "content", "post_id", "user_id", "createdAt"],
      include: { model: User, attributes: ["username"] },
    });
    res.json(response);
  } catch (err) {
    res.status(500);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const response = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.json(response);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
