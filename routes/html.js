const db = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const user = req.user;

  // DEBUG:
  console.log(`user = ${JSON.stringify(user)}`);

  let podcasts = null;

  if (user == null) {
    podcasts = await db.Podcast.findAll({
      order: [['name', 'ASC']],
      limit: 16,
      raw: true,
      nest: true
    });
  } else {
    // DEBUG:
    // console.log(`subscriptions = ${req.}`)

    /*
      Thanks to [Sahar Hadas](https://stackoverflow.com/users/2957168/shahar-hadas) for this awesome solution.
    */
    const subQuery = db.sequelize.dialect.QueryGenerator.selectQuery(
      'PodcastUserData',
      {
        attributes: ['podcastId'],
        where: {
          userId: user.id,
          subscribed: true
        }
      }).slice(0, -1); // to remove the trailing semicolon

    // DEBUG:
    // console.log(`subQuery = ${subQuery}`);

    podcasts = await db.Podcast.findAll({
      order: [['name', 'ASC']],
      limit: 16,
      where: {
        id: {
          [db.Sequelize.Op.notIn]: db.sequelize.literal(`(${subQuery})`)
        }
      },
      raw: true,
      nest: true
    });
  }

  res.render('podcasts', { podcasts: podcasts, user: req.user, subscribe: req.isAuthenticated() });
});

router.get('/subscriptions', async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  }

  try {
    const subscriptions = await db.Podcast.findAll({
      order: [['name', 'ASC']],
      include: [{
        model: db.PodcastUserData,
        where: {
          userId: req.user.id,
          subscribed: true
        }
      }],
      limit: 16,
      raw: true,
      nest: true
    });

    console.log(`subscriptions = ${JSON.stringify(subscriptions)}`);

    // res.json(subscriptions);
    res.render('podcasts', { podcasts: subscriptions, subscriptions: true, user: req.user, subscribe: false });
  } catch (e) {
    console.error(e.stack);
    res.status(500).end();
  }
});

router.get('/podcast/:id', async (req, res) => {
  try {
    const episodes = await db.PodcastEpisode.findAll({
      order: [['publishDate', 'DESC']],
      where: { podcastId: req.params.id },
      include: [db.Podcast],
      limit: 24,
      raw: true,
      nest: true
    });

    res.render('episodes', { podcast: episodes[0].Podcast, episodes, user: req.user });
  } catch (e) {
    console.error(e.stack);
    res.status(500).end();
  }
});

module.exports = router;
