require('dotenv').config();

const express = require('express');
const passport = require('passport');
const Strategy = require('passport-github').Strategy;

passport.use(new Strategy({
    clientID: process.env[CLIENT_ID],
    clientSecret: process.env[CLIENT_SECRET],
    callbackURL: '/return'
},
function(accessToken, refreshToken, profile, cb) {

}
return cb(null, profile);
}));


