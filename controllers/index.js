// Imports
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Creating routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// fallback route
router.use((req, res) => {
    res.status(404).end();
})

module.exports = router