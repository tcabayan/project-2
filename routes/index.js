const router = require('express').Router();
const RSS_ROUTES = require('./rss-routes');
const AUTH_ROUTES = require('./auth-routes');

router.use('/rss', RSS_ROUTES);
router.use('/auth', AUTH_ROUTES);

module.exports = router;
