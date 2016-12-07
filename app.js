var express = require('express');
var path = require("path");
var https = require('https');
var fs = require('fs');
var app = express();

app.set('port', (process.env.PORT || 8080));

//Public files
app.use(express.static('public/resources'));
app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public/html'));

//node_modules
app.use(express.static('node_modules'));
//node_modules
app.use(express.static('bower_components'));

//WebComponents
app.use(express.static('../WebComponents'));
app.use(express.static('../Versionado'));
app.use(express.static('../WebComponents2.0'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/config', function (req, res) {
	var json = require('./config.json');
  res.send(json);
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'yolo') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

var server = https.createServer({
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/ssl.crt')
}, app).listen(app.get('port'));