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

module.exports = router;
