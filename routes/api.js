const db = require('../models');
const router = require('express').Router();

const Parser = require('rss-parser');
const parser = new Parser();
const Sequelize = require('sequelize');

router.get('/podcasts', async (req, res) => {
  const podcasts = await db.Podcast.findAll();

  res.json(podcasts);
});

/*
 * refreshPodcast takes in a Podcast model from the db,
 * and parses the latest data from the rssUrl, updating the
 * existing model in the DB
 */
const refreshPodcast = async (podcast) => {
  // parse the rssUrl in the podcast record
  const feed = await parser.parseURL(podcast.rssUrl);

  // DEBUG:
  // console.log(`Adding RSS feed: ${podcast.rssUrl}`);

  // update the podcast based on the parsed feed
  podcast.name = feed.title;
  podcast.author = feed.itunes.author;
  podcast.description = feed.description;
  podcast.copyright = feed.copyright;
  podcast.link = feed.link;
  podcast.imageUrl = feed.itunes.image;

  // save the updates to the DB
  podcast = await podcast.save();

  // [1, 2, 3].map(x => x + 1) => [2, 3, 4]
  // Promise.all([p1, p2, p3]) => resolves when p1, p2, and p3 are done

  // add each episode in the RSS to the database
  // for now, we do not update existing episodes
  return Promise.all(feed.items.map(item => {
    return podcast.createPodcastEpisode({
      name: item.title,
      author: item.author,
      description: item.itunes.summary,
      duration: item.itunes.duration,
      publishDate: item.isoDate,
      audioUrl: item.enclosure.url,
      imageUrl: item.itunes.image,
      link: item.link,
      feedGuid: item.guid
    });
  }));
};

router.post('/podcast', async (req, res) => {
  try {
    const podcast = db.Podcast.build({ rssUrl: req.body.rssUrl });

    await refreshPodcast(podcast);

    res.json(podcast);
  } catch (e) {
    // FIXME: this is a silly way to handle uniqueness/updates
    if (!(e instanceof Sequelize.UniqueConstraintError)) {
      res.status(500);
    }

    console.error(e.stack);
  }

  res.end();
});

router.post('/podcast/:id', async (req, res) => {
  try {
    const subscribed = JSON.parse(req.body.subscribe);
    const userId = req.body.userId;
    const podcastId = parseInt(req.body.podcastId);

    const [podcastUserData] = await db.PodcastUserData.findOrCreate({
      where: { podcastId },
      defaults: { subscribed, userId }
    });

    if (podcastUserData) {
      res.send({ subscribed: true });
    }
  } catch (e) {
    // FIXME: this is a silly way to handle uniqueness/updates
    if (!(e instanceof Sequelize.UniqueConstraintError)) {
      res.status(500);
    }

    console.error(e.stack);
  }

  res.end();
});

router.get('/subscriptions/:user/:username', async (req, res) => {
  const userId = req.params.user;
  const userName = req.params.username;

  try {
    const subscriptions = await db.Podcast.findAll({
      order: [['name', 'ASC']],
      include: [{
        model: db.PodcastUserData,
        where: {
          userId: userId,
          subscribed: true
        }
      }],
      limit: 16,
      raw: true,
      nest: true
    });

    console.log(`subscriptions = ${JSON.stringify(subscriptions)}`);

    // res.json(subscriptions);
    res.render('podcasts', { podcasts: subscriptions, user: userId, user: userName, subscriptions: true });
  } catch (e) {
    // FIXME: this is a silly way to handle uniqueness/updates
    if (!(e instanceof Sequelize.UniqueConstraintError)) {
      res.status(500);
    }

    console.error(e.stack);
  }

  // res.end();
});

router.get('/podcast/:id/episodes', async (req, res) => {
  try {
    const episodes = await db.PodcastEpisode.findAll({
      order: [['publishDate', 'DESC']],
      where: { podcastId: req.params.id },
      include: [db.Podcast],
      limit: 24,
      raw: true,
      nest: true
  });

  res.render('index', { episodes: episodes });

  } catch (e) {
    // FIXME: this is a silly way to handle uniqueness/updates
    if (!(e instanceof Sequelize.UniqueConstraintError)) {
      res.status(500);
    }

    console.error(e.stack);
  }

  // res.end();
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

    console.error(e.stack);
  }

  res.end();
});

module.exports = router;
