require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const passport = require('passport');
const session = require('cookie-session');

const PORT = process.env.PORT || 3000;

const app = express();

// static files
app.use(express.static('public'));

// request handlers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// session and authentication
app.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./auth/auth');
require('./auth/github');

// logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// templating
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// routes
app.use(require('./routes/html'));
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => console.log('Visit http://localhost:3000 in your browser.'));
