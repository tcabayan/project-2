const db = require('../models');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(new GitHubStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  // callbackURL: 'https://fsf-p02.herokuapp.com/auth/github/callback'
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
}, async (accessToken, refreshToken, profile, cb) => {
  const githubId = profile.id;
  const username = profile.username;

  try {
    const [user] = await db.User.findOrCreate({
      where: { githubId },
      defaults: { username }
    });

    cb(null, user);
  } catch (e) {
    cb(e, null);
  }
}));
