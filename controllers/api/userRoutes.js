const router = require("express").Router();
const { User } = require("../../model");
const Auth = require("../../utils/auth");

// GET ROUTE(S)
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_body"],
      },
      {
        model: Comment,
        attributes: ["id", "commentText"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// the user needs to login
router.post("/login", async (req, res) => {
  try {
    const response = await User.findOne({
      where: { username: req.body.username },
    });
    if (!response) {
      res.status(404);
      return;
    }
    const validPassword = response.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(404);
      return;
    }
    req.session.save(() => {
      req.session.username = response.username;
      req.session.user_id = response.id;
      req.session.loggedIn = true;
      res.json({ user: response.username, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500);
  }
});

// POST /user/signup
router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.username = response.username;
        req.session.user_id = response.id;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
