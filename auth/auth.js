const db = require('../models');
const passport = require('passport');

passport.serializeUser((user, cb) => {
  // DEBUG:
  // console.log(`user = ${user}`);

  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await db.User.findOne({ where: { id } });
    cb(null, user);
  } catch (e) {
    cb(e, null);
  }
});
