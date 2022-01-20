const router = require('express').Router();
const { User, blogPosts, blogPost } = require('../../model')

router.get('/', (req, res) => {
    console.log("--------------FInding Posts --------------")
    blogPosts.findAll({
        attributes: [
            'id', 'title', 'post_body', 'created_at'
        ],
        include :[
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(blogPostDbData => {
            res.send(blogPostsDbData)
            console.log("--------------Posts Found--------------")
        })
        .catch(err => {
            console.log("--------------Posts Not Found--------------")
            res.status(500).json(err)
        })
});

router.get('/:id', (req, res) => {
    console.log("--------------FInding Post --------------");
    blogPost.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_body',
            'title',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'sorry that post doesn\'t exist' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST 
router.post('/', (req, res) => {
    blogPost.create({
        title: req.body.title,
        post_body: req.body.post_body,
        user_id: req.body.user_id
    })
    .then(dbPostData => {
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})



module.exports = router;