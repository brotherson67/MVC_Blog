const router = require("express").Router();
const { User, Comment, blogPost } = require("../model");

// GET /post/
router.get("/", async (req, res) => {
  try {
    console.log("--------------FInding Posts --------------");
    const response = await Post.findAll({
      attributes: ["id", "title", "user_id"],
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, attributes: ["content"] },
      ],
    });
    res.json(response);
  } catch (err) {
    res.status(500);
  }
});

router.get("/:id", (req, res) => {
  console.log("--------------FInding Post --------------");
  blogPost
    .findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_body", "title", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "sorry that post doesn't exist" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST
router.post("/", (req, res) => {
  blogPost
    .create({
      title: req.body.title,
      post_body: req.body.post_body,
      user_id: req.body.user_id,
    })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
