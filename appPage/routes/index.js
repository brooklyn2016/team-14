var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  var view = 'index.html'
  res.sendFile(path.join(__dirname, '../views', view))
  // res.render('index', { title: 'Express' });
});

router.get('/results.html', function(req, res, next) {
  var view = 'results.html'
  // res.sendFile(path.join(__dirname, '../views', view))
  res.render('results', { url: req.param('url') });
});

module.exports = router;
