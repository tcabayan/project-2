/* const db = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const episodes = await db.PodcastEpisode.findAll({
    order: [['publishDate', 'DESC']],
    limit: 15,
    include: [db.Podcast],
    raw: true,
    nest: true
  });

  res.render('index', { episodes: episodes, user: req.user });
});

module.exports = router;
*/

const db = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const user = req.user;

  // DEBUG:
  console.log(`user = ${JSON.stringify(user)}`);

  /*   const episodes = (req.user)
    ? await db.PodcastEpisode.findAll({
      order: [['publishDate', 'DESC']],
      limit: 24,
      include: [{
        model: db.PodcastEpisodeUserData,
        include: [
          { model: db.User }
        ]
      }],
      where: { userId: req.user.dataValues.id },
      raw: true,
      nest: true
    })
    : await db.PodcastEpisode.findAll({
      order: [['publishDate', 'DESC']],
      limit: 24,
      include: [db.Podcast],
      raw: true,
      nest: true
    }); */

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

  res.render('podcasts', { podcasts: podcasts, user: req.user });
});

module.exports = router;
