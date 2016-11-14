var express = require('express');
var path = require("path");
var https = require('https');
var fs = require('fs');
var app = express();

//Public files
app.use(express.static('public/resources'));
app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public/html'));

//node_modules
app.use(express.static('node_modules'));

//WebComponents
app.use(express.static('../WebComponents'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

var server = https.createServer({
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/ssl.crt')
}, app).listen(8080);