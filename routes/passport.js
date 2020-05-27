const express = require('express');
const app = express();
const passport = require('passport');

// user not logged in
app.get('/', function (req, res) {
  res.render('index', { user: req.user });
});

// user logged in
app.get('/', ensureAuthenticated, function (req, res) {
  res.render('index', { user: req.user });
});

// send out github auth get request
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
  });

// callback for github auth
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });

// logout - end session
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(3000);

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
