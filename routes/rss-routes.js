const router = require('express').Router();
const Parser = require('rss-parser');
const parser = new Parser();
const db = require('../models');

router.get('/feed', async (req, res) => {
  const feed = await parser.parseURL('http://wtfpod.libsyn.com/rss');
  // res.json(feed)
  const parsedFeed = feed.items.splice(0, 20).map(a => { a.pubDate = a.pubDate.split('+')[0]; return a; });
  res.render('index2', parsedFeed);
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link);
    console.log(item.contentSnippet);
  });
});

router.post('/addpod', (req, res) => {
  db.Podcast.create(req.body);
});

module.exports = router;
