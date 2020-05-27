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

const Parser = require('rss-parser');
const parser = new Parser();
const db = require('../models');

router.get('/feed', async (req, res) => {
  const feed = await parser.parseURL('http://billmaher.hbo.libsynpro.com/rss');
  // res.json(feed)
  const parsedFeed = feed.items.splice(0, 5).map(a => { a.pubDate = a.pubDate.split('+')[0]; return a; });
  res.render('index', { parsedFeed: parsedFeed });
  console.log(feed);
  // console.log(feed.itunes.image);

  /* feed.items.forEach(item => {
    console.log(item.title + ':' + item.link);
    console.log(item.itunes.image);
  }); */
});

router.post('/addpod', (req, res) => {
  db.Podcast.create(req.body);
});

// route to handle logged in users hitting their logged in/profile page
// takes request.user (from githubID) js will parse it out and

router.get('/podcasts/member');
module.exports = router;
