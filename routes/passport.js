const passport = require('passport');
const router = require('express').Router();

// send out github auth get request
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
  });

// callback for github auth
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  });

module.exports = router;
