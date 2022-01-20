const router = require('express').Router();
const { User, blog, blogPost } = require('../../model');

// GET ROUTE(S)

router.get('/', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
              model: blogPost,
              attributes: ['id', 'title', 'post_body', 'created_at']
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'that user doesn\'t exist'});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user
        })
    })
})

module.exports = router;