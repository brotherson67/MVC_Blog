const router = require('express').Router();

const blogPosts = require('./blogRoutes');
const User = require('./userRoutes');

router.use('/profile', User)
router.use('/posts', blogPosts);

module.exports = router;