const isAuthenticated = require('../config/middleware/isAuthenticated');
const router = require('express').Router();

router.get('/', function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect('/members');
  }
  res.render('index');
});

router.get('/login', function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect('/members');
  }
  res.render('login');
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get('/members', isAuthenticated, function (req, res) {
  res.render('member');
});

module.exports = router;
