var express = require('express');
var router = express.Router();
var path = require('path');

view = 'results.html'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', view))
  // res.render('index', { title: 'Express' });
});


module.exports = router;