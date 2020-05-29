const passport = require('passport');
const router = require('express').Router();

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// send out github auth get request
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }));

// callback for github auth
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = router;
