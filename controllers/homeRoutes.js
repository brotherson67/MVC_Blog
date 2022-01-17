// HomeRoutes is what directs to the different handlebars files
const router = require('express').Router();
const sequelize = require('../config/connection');
const { blogPosts } = require('../model');

router.get('/', (req, res) => {
    console.log("You're getting the homepage");
    res.send('Good Job, youre on the home page')
})