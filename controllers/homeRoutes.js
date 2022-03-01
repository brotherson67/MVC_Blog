// HomeRoutes is what directs to the different handlebars files
const router = require("express").Router();
const sequelize = require("../config/connection");
const { blogPosts, User, Comment } = require("../model");

router.get("/", (req, res) => {
  console.log("You're getting the homepage");
  res.render("homepage", {
    id: 1,
    post_url: "https://handlebarsjs.com/guide/",
    title: "Hanglebars Docs",
  });
});

router.get("/login", (req, res) => {
  res.render("login", { login: true });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
