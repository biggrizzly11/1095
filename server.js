var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var pdffiller = require('pdffiller');


// Controllers
var compCtrl = require('./controllers/compCtrl.js');
var empCtrl = require('./controllers/empCtrl.js');
var form1095Ctrl = require('./controllers/form1095Ctrl.js');
var form1094Ctrl = require('./controllers/form1094Ctrl.js');

// Models
// var Emp = require('./models/empModel.js');
var User = require('./models/UserModel');

// Policies
var isAuthed = function(req, res, next) {
	// console.log(req);
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

// Passport
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  User.findOne({ email: email })

  .exec(function(err, user) {
    if(err) done(err);
    if(!user) return done(null, false);
    if(user.verifyPassword(password)) return done(null, user);
    return done(null, false);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(_id, done) {
  User.findById(_id, function(err, user) {
    done(err, user);
  });
});

// Express

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));



app.use(session({
	secret: 'poop',
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Login

app.get('/users', compCtrl.getUser);
app.post('/users', compCtrl.register);
app.get('/me', isAuthed, compCtrl.me);
app.post('/login', passport.authenticate('local', {
	successRedirect: '/me'
}));
app.get('/logout', function(req, res) {
	req.logout();
	return res.status(200).send('Logged Out');
});


// company endpoints

app.put('/api/user/:id', compCtrl.updateUser);
app.post('/api/comp', compCtrl.compCreate);
app.get('/api/comp', compCtrl.compRead);
app.put('/api/comp', compCtrl.compUpdate);
app.delete('/api/comp', compCtrl.compDelete);
app.post('/api/comp/:id', compCtrl.compAddEmp);
app.get('/api/total/:id', compCtrl.getTotal);
app.post('/api/newemp/:id', compCtrl.compNewEmp);

// Emp endpoints

app.post('/api/emp', empCtrl.empCreate);
app.get('/api/emp', empCtrl.empRead);
app.put('/api/emp', empCtrl.empUpdate);
app.delete('/api/emp/:id', empCtrl.empDelete);

// Forms

app.get('/api/form/:id', form1095Ctrl.get1095);
app.get('/api/form94/:id', form1094Ctrl.get1094);

// Connection

mongoose.connect('mongodb://localhost/health');
mongoose.connection.once('open', function() {
	console.log('Connected to mongodb health');
});

var port = 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});



