const router = require('express').Router();

const Parser = require('rss-parser');
const parser = new Parser();

router.get('/', async (req, res) => {
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

module.exports = router;
