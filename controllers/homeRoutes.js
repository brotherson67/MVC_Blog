// HomeRoutes is what directs to the different handlebars files
const router = require('express').Router();
const sequelize = require('../config/connection');
const { blogPosts } = require('../model');

router.get('/', (req, res) => {
    console.log("You're getting the homepage");
    res.render('homepage', {
        id:1,
        post_url:'https://handlebarsjs.com/guide/',
        title: 'Hanglebars Docs'
    })
})

module.exports = router;