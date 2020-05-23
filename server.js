require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

const routes = require('./routes');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
// need session to keep track of user's login status
// app.use(session({ secret: '???', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// require routes
// require('./routes/api-route-login')(app);
// require('./routes/html-route-login')(app);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(routes);
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// code below is to render the rss-parser podcasts page
app.engine('handlebars', exphbs({ defaultLayout: 'main2' }));
app.set('view engine', 'handlebars');

app.use(require('./routes/ui'));

app.listen(PORT, () => console.log(`App listening on port ${PORT} ...`));
