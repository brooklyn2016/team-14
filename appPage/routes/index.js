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
  var fs = require('fs');
  var array = fs.readFileSync('dict.txt').toString().split("\n");
  var cleaned = new Array();
  for(i in array) {
      if (array[i].length > 0) {
        cleaned.push(array[i]);
      }
  }
  res.render('results', {
    url: req.params.translation,
    suggestions: cleaned
  });
});

router.post('/parse', function(req, res, next) {
  var speech = require('@google-cloud/speech')({
    projectId: 'model-gearing-147900',
    keyFilename: 'keyfile.json'
  });
  // console.dir(req);
  var config = {
    encoding: 'LINEAR16',
    sampleRate: 16000,
    verbose: true
  };
  var file = {
    content: req.body.base64.split(',')[1]
  };
  // console.log(req.body.base64.split(',')[1])
  speech.recognize(file, config, function (err, response, apiResponse) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(apiResponse);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
    // res.render('results', { url: "maybe try again?"});
  });
  // speech.recognize(file, config, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(`Transcription: ${result}`);
  // };
});

router.get('/submit.html', function(req, res, next) {
  var view = 'index.html'
  // res.sendFile(path.join(__dirname, '../views', view))
  var fs = require('fs');
  console.log(req);
  var suggestion = req.query.suggestion;
  fs.appendFile('dict.txt', '\n'+suggestion, function (err) {});
  // var array = fs.readFileSync('dict.txt').toString().split("\n");
  res.sendFile(path.join(__dirname, '../views', view))
});

module.exports = router;
