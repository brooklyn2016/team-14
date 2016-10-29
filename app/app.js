var express = require('express');
var app = express();

var fs = require('fs'),
    obj
fs.readFile('data/input.json', convertSpeech)
fs.readFile('../dictionary.json', convertSpeech2)

var filepath = 'data/input.json'

fs.readFile(filepath, convertSpeech)

function convertSpeech(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
    transcript = obj.results[0].alternatives[0].transcript
    confidence = obj.results[0].alternatives[0].confidence
    console.log(transcript);
    console.log(confidence);
    // You can now play with your datas
}

function convertSpeech2(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
    transcript = obj.Eric.abbaa.apple
    console.log(transcript);
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Welcome to the express/node server');
});
