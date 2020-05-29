const db = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const episodes = await db.PodcastEpisode.findAll({
    order: [['publishDate', 'DESC']],
    limit: 24,
    include: [db.Podcast],
    raw: true,
    nest: true
  });

  res.render('index', { episodes: episodes, user: req.user });
});

module.exports = router;
