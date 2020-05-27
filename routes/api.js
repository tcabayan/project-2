const db = require('../models');
const router = require('express').Router();

router.post('/podcast', (req, res) => {
  db.Podcast.create(req.body);
});

module.exports = router;
