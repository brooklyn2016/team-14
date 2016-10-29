var express = require('express');
var app = express();

var fs = require('fs'),
    obj
fs.readFile('data/input.json', convertSpeech)


function convertSpeech(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
    transcript = obj.results[0].alternatives[0].transcript
    console.log(transcript);
    // You can now play with your datas
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Welcome to the express/node server');
});
