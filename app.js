var express = require('express');
var app = express();
var path = require("path");

app.use(express.static(__dirname + '/public/resources'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/html'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});