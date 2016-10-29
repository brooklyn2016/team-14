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

router.post('/parse', function(req, res, next) {
  var speech = require('@google-cloud/speech')({
    projectId: 'model-gearing-147900',
    keyFilename: 'keyfile.json'
  });
  // console.dir(req);
  var config = {
    encoding: 'LINEAR16',
    sampleRate: 16000
  };
  var file = {
    content: req.body.base64
  };
  speech.recognize(file, config, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
  // speech.recognize(file, config, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(`Transcription: ${result}`);
  // };
});

module.exports = router;
