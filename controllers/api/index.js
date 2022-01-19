const router = require('express').Router();

const blogPosts = require('./blogRoutes');

router.use('/', blogPosts);

module.exports = router;