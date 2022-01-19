const router = require('express').Router();
const { User } = require('../../model');

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