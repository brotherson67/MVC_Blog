const router = require('express').Router();
const { blogPosts } = require('../../model')

router.get('/', (req, res) => {
    blogPosts.findAll()
        .then(blogPostDbData => res.send(blogPostsDbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
})

module.exports = blogPosts;