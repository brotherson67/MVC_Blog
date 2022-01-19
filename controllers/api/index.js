const router = require('express').Router();

const blogPosts = require('./blogRoutes');

router.use('/blogPosts', blogPosts);

module.exports = router;