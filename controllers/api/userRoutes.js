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
router.post("/signup", async (req, res) => {
  try {
    const response = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.username = response.username;
      req.session.user_id = response.id;
      req.session.loggedIn = true;
      res.json(response);
    });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
