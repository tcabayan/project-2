const db = require('../models');
const router = require('express').Router();

const Parser = require('rss-parser');
const parser = new Parser();
const Sequelize = require('sequelize');

/*
 * refreshPodcast takes in a Podcast model from the db,
 * and parses the latest data from the rssUrl, updating the
 * existing model in the DB
 */
const refreshPodcast = async (podcast) => {
  // parse the rssUrl in the podcast record
  const feed = await parser.parseURL(podcast.rssUrl);
  console.log(`Adding RSS feed: ${podcast.rssUrl}`);

  // update the podcast based on the parsed feed
  podcast.author = feed.itunes.author;
  podcast.name = feed.title;

  // save the updates to the DB
  podcast = await podcast.save();

  // [1, 2, 3].map(x => x + 1) => [2, 3, 4]
  // Promise.all([p1, p2, p3]) => resolves when p1, p2, and p3 are done

  // add each episode in the RSS to the database
  // for now, we do not update existing episodes
  return Promise.all(feed.items.map(item => {
    return podcast.createPodcastEpisode({
      name: item.title,
      publishDate: item.pubDate,
      audioUrl: item.enclosure.url,
      feedGuid: item.guid
    });
  }));
};

router.post('/podcast', async (req, res) => {
  try {
    const podcast = db.Podcast.build({ rssUrl: req.body.rssUrl });
    await refreshPodcast(podcast);
  } catch (e) {
    // FIXME: this is a silly way to handle uniqueness/updates
    if (!(e instanceof Sequelize.UniqueConstraintError)) {
      res.status(500);
    }
  }
  res.end();
});

router.get('/podcast/:id/refresh', async (req, res) => {
  try {
    const podcast = await db.Podcast.findOne({ where: { id: req.params.id } });
    await refreshPodcast(podcast);
  } catch (e) {
    // FIXME: this is a silly way to handle uniqueness/updates
    if (!(e instanceof Sequelize.UniqueConstraintError)) {
      res.status(500);
    }
  }
  res.end();
});

module.exports = router;
