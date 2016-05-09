var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/health');
mongoose.connection.once('open', function() {
	console.log('Connected to mongodb health');
});


var port = 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});