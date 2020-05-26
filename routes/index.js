const router = require('express').Router();
// const AUTH_ROUTES = require('./api-route-login');
const HTML_ROUTES = require('./html-route-login');
router.use(HTML_ROUTES);

module.exports = router;
