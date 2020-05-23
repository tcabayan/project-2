const Router = require('express').Router;
const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', function (req, res) {
  res.render('login');
});

module.exports = router;
