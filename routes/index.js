const router = require('express').Router();
const RSS_ROUTES = require('./rss-routes');
// const AUTH_ROUTES = require('./api-route-login');
const HTML_ROUTES = require('./html-route-login');

router.use('/rss', RSS_ROUTES);
// router.use('/auth', AUTH_ROUTES);
router.use(HTML_ROUTES);

module.exports = router;
