const router = require('express').Router();
const { User, blogPosts } = require('../../model')

router.get('/', (req, res) => {
    console.log("--------------FInding Posts --------------")
    blogPosts.findAll()
        .then(blogPostDbData => {
            res.send(blogPostsDbData)
            console.log("--------------Posts Found--------------")
        })
        .catch(err => {
            console.log("--------------Posts Not Found--------------")
            res.status(500).json(err)
        })
})

module.exports = blogPosts;