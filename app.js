var express = require('express');
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

//webcomponents heroku
app.use(express.static('lib'));

//WebComponents local
//app.use(express.static('../WebComponents'));
//app.use(express.static('../Versionado'));
//app.use(express.static('../'));


app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/config', function (req, res) {
	var json = require('./config.json');
  res.send(json);
});

app.listen(app.get('port'));