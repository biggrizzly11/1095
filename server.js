var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;


var compCtrl = require('./controllers/compCtrl.js');
var empCtrl = require('./controllers/empCtrl.js');
var compSchema = require('./models/compModel.js');

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/health');
mongoose.connection.once('open', function() {
	console.log('Connected to mongodb health');
});

app.use(session({
	secret: 'poop',
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', 
	passport.authenticate('local', {
		successRedirect: '/getCurrentUser',
		failureRedirect: '/loginFailure'
	})
);

app.get('/loginFailure', function(req, res) {
	console.log('Fail');
	res.send('Failded to Authenticate');
});

app.get('/getCurrentUser', compCtrl.getCurrentUser);

app.get('/loginSuccess', function(req, res) {
	res.send('Successfully Authenticated');
});

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new LocalStrategy(function(username, password, done) {
	// console.log(username);
	// console.log(password);
	process.nextTick(function() {
		//Auth Check Login
		compSchema.findOne({
			username : username,
		}, function(err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false);
			} 

			if (user.password != password) {
				return done(null, false);
			}
			// console.log("success!");
			return done(null, user);
		});
	});
}));


// company endpoints
app.post('/api/comp', compCtrl.compCreate);
app.get('/api/comp', compCtrl.compRead);
app.put('/api/comp', compCtrl.compUpdate);
app.delete('/api/comp', compCtrl.compDelete);
app.post('/api/comp/:id', compCtrl.compAddEmp);

// Emp endpoints
app.post('/api/emp', empCtrl.empCreate);
app.get('/api/emp', empCtrl.empRead);
app.put('/api/emp', empCtrl.empUpdate);
app.delete('/api/emp', empCtrl.empDelete);

var port = 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});