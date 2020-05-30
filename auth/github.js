/* eslint-disable no-undef */
const db = require('../models');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

passport.use(new GitHubStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL

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
