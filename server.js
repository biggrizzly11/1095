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

// Models
// var User = require('./models/compModel.js');
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

app.post('/api/comp', compCtrl.compCreate);
app.get('/api/comp', compCtrl.compRead);
app.put('/api/comp', compCtrl.compUpdate);
app.delete('/api/comp', compCtrl.compDelete);
app.post('/api/comp/:id', compCtrl.compAddEmp);
app.get('/api/total/:id', compCtrl.getTotal);

// Emp endpoints

app.post('/api/emp', empCtrl.empCreate);
app.get('/api/emp', empCtrl.empRead);
app.put('/api/emp', empCtrl.empUpdate);
app.delete('/api/emp', empCtrl.empDelete);

// Forms

app.get('/api/form/:id', form1095Ctrl.get1095);

// Connection

mongoose.connect('mongodb://localhost/health');
mongoose.connection.once('open', function() {
	console.log('Connected to mongodb health');
});

var port = 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});



// var data = {
// 'topmostSubform[0].Page1[0].c1_01_VOID[0]': '',
// 'topmostSubform[0].Page1[0].c1_02_CORRECTED[0]': '',
// 'topmostSubform[0].Page1[0].EmployeeName[0].f1_002[0]': 'Poop',
// 'topmostSubform[0].Page1[0].EmployeeName[0].f1_003[0]': '',
// 'topmostSubform[0].Page1[0].EmployeeName[0].f1_004[0]': 'More Poop',
// 'topmostSubform[0].Page1[0].EmployeeName[0].f1_005[0]': '',
// 'topmostSubform[0].Page1[0].EmployeeName[0].f1_006[0]': '',
// 'topmostSubform[0].Page1[0].EmployeeName[0].f1_007[0]': '',
// 'topmostSubform[0].Page1[0].EmployerIssuer[0].f1_008[0]': '',
// 'topmostSubform[0].Page1[0].EmployerIssuer[0].f1_009[0]': '',
// 'topmostSubform[0].Page1[0].EmployerIssuer[0].f1_010[0]': '',
// 'topmostSubform[0].Page1[0].EmployerIssuer[0].f1_011[0]': '',
// 'topmostSubform[0].Page1[0].EmployerIssuer[0].f1_012[0]': '',
// 'topmostSubform[0].Page1[0].EmployerIssuer[0].f1_013[0]': '',
// 'topmostSubform[0].Page1[0].EmployerIssuer[0].f1_014[0]': '',
// 'topmostSubform[0].Page1[0].PlanStartMonth[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_011[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_012[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_013[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_014[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_015[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_016[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_017[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_018[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_019[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_020[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_021[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_022[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow1[0].f1_023[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_025[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_026[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_027[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_028[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_029[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_030[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_031[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_032[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_033[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_034[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_035[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_036[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow2[0].f1_300[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_050[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_051[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_052[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_053[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_054[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_055[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_056[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_057[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_058[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_059[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_060[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_061[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0].BodyRow3[0].f1_062[0]': '',
// 'topmostSubform[0].Page1[0].Part2Table[0]': '',
// 'topmostSubform[0].Page1[0].PartIII[0].c1_02_0_[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].Ln17[0].Name1[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].SSN1[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].DOB1[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_011[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_012[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_013[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_014[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_015[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_016[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_017[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_018[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_019[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_020[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_021[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_022[0]': '',
// 'topmostSubform[0].Page1[0].Line17[0].c1_023[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].#subform[0].Name2[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].SSN2[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].DOB2[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_024[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_025[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_026[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_027[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_028[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_029[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_030[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_031[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_032[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_033[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_034[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_035[0]': '',
// 'topmostSubform[0].Page1[0].Line18[0].c1_036[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].#subform[0].Name3[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].SSN3[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].DOB3[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_038[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_039[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_040[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_041[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_042[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_043[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_044[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_045[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_046[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_047[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_048[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_049[0]': '',
// 'topmostSubform[0].Page1[0].Line19[0].c1_037[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].Ln20[0].Name4[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].SSN4[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].DOB4[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_050[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_051[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_052[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_053[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_054[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_055[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_056[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_057[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_058[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_059[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_060[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_061[0]': '',
// 'topmostSubform[0].Page1[0].Line20[0].c1_062[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].Ln21[0].Name5[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].SSN5[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].DOB5[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_063[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_064[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_065[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_066[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_067[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_068[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_069[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_070[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_071[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_072[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_073[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_074[0]': '',
// 'topmostSubform[0].Page1[0].Line21[0].c1_075[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].Ln22[0].Name6[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].SSN6[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].DOB6[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_077[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_078[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_079[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_080[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_081[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_082[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_083[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_084[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_085[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_086[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_087[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_088[0]': '',
// 'topmostSubform[0].Page1[0].Line22[0].c1_076[0]': '',
// 'topmostSubform[0].Page3[0].f3_001[0]': '',
// 'topmostSubform[0].Page3[0].f3_002[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].f2_01[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].f2_02[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].f2_03[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_01[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_02[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_03[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_04[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_05[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_06[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_07[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_08[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_09[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_10[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_11[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_12[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow1[0].c2_13[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].f2_04[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].f2_05[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].f2_06[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_14[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_15[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_16[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_17[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_18[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_19[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_20[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_21[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_22[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_23[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_24[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_25[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow2[0].c2_26[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].f2_07[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].f2_08[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].f2_09[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_27[0]': 'X',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_28[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_29[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_30[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_31[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_32[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_33[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_34[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_35[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_36[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_37[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_38[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow3[0].c2_39[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].f2_10[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].f2_11[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].f2_12[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_40[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_41[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_42[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_43[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_44[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_45[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_46[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_47[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_48[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_49[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_50[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_51[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow4[0].c2_52[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].f2_12[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].f2_13[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].f2_14[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_53[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_54[0]': 'Yes',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_55[0]': 'YES',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_56[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_57[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_58[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_59[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_60[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_61[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_62[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_63[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_64[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow5[0].c2_65[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].f1_15[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].f1_16[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].f1_17[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_66[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_67[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_68[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_69[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_70[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_71[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_72[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_73[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_74[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_75[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_76[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_77[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow6[0].c2_78[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].f1_18[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].f1_19[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].f1_20[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_79[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_80[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_81[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_82[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_83[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_84[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_85[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_86[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_87[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_88[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_89[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_90[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow7[0].c2_91[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].f1_21[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].f1_22[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].f1_23[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_92[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_93[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_94[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_95[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_96[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_97[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_98[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_99[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_100[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_101[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_102[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_103[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow8[0].c2_104[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].f1_24[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].f1_25[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].f1_26[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_105[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_106[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_107[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_108[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_109[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_110[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_111[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_112[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_113[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_114[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_115[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_116[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow9[0].c2_117[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].f1_27[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].f1_28[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].f1_29[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_118[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_119[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_120[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_121[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_122[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_123[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_124[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_125[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_126[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_127[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_128[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_129[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow10[0].c2_130[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].f1_30[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].f1_31[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].f1_32[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_131[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_132[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_133[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_134[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_135[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_136[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_137[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_138[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_139[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_140[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_141[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_142[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow11[0].c2_143[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].f1_33[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].f1_34[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].f1_35[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_144[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_145[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_146[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_147[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_148[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_149[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_150[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_151[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_152[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_153[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_154[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_155[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0].BodyRow12[0].c2_156[0]': '',
// 'topmostSubform[0].Page3[0].Table_Part4[0]': '',
// 'topmostSubform[0]': '',
// };

// var sourcePdf = 'f1095c.pdf';
// var desPdf = 'f1095cnew.pdf';
// pdffiller.fillForm(sourcePdf, desPdf, data, function(err) {

// });
//app.post('/login', 
// 	passport.authenticate('local', {
// 		successRedirect: '/getCurrentUser',
// 		failureRedirect: '/loginFailure'
// 	})
// );

// app.get('/loginFailure', function(req, res) {
// 	console.log('Fail');
// 	res.send('Failded to Authenticate');
// });

// app.get('/getCurrentUser', compCtrl.compRead);

// app.get('/loginSuccess', function(req, res) {
// 	res.send('Successfully Authenticated');
// });

// passport.serializeUser(function(user, done) {
// 	done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
// 	done(null, obj);
// });

// passport.use(new LocalStrategy(function(username, password, done) {
// 	// console.log(username);
// 	// console.log(password);
// 	process.nextTick(function() {
// 		//Auth Check Login
// 		compSchema.findOne({
// 			username : username,
// 		}, function(err, user) {
// 			if (err) {
// 				return done(err);
// 			}

// 			if (!user) {
// 				return done(null, false);
// 			} 

// 			if (user.password != password) {
// 				return done(null, false);
// 			}
// 			// console.log("success!");
// 			return done(null, user);
// 		});
// 	});
// }));

// 1094 
// var data = {
// 'topmostSubform[0].Page1[0].c1_01_CORRECTED[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_01[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_02[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_03[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_04[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_05[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_06[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_07[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_08[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_09[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_10[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_11[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_12[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_13[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_14[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_15[0]': '',
// 'topmostSubform[0].Page1[0].Name[0].f1_16[0]': '',
// 'topmostSubform[0].Page1[0].c1_02[0]': '',
// 'topmostSubform[0].Page1[0].f1_17[0]': '',
// 'topmostSubform[0].Page1[0].c1_03[0]': '',
// 'topmostSubform[0].Page1[0].f1_18[0]': '',
// 'topmostSubform[0].Page1[0].c1_08[0]': '',
// 'topmostSubform[0].Page1[0].c1_08[1]': '',
// 'topmostSubform[0].Page1[0].c1_04[0]': '',
// 'topmostSubform[0].Page1[0].c1_05[0]': '',
// 'topmostSubform[0].Page1[0].c1_06[0]': '',
// 'topmostSubform[0].Page1[0].c1_07[0]': '',
// 'topmostSubform[0].Page1[0].Title2[0].f1_166[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row1[0].p2-cb1[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row1[0].p2-cb1[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row1[0].f2_300[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row1[0].f2_01[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row1[0].c2_01[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row1[0].f2_02[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row2[0].p2-cb2[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row2[0].p2-cb2[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row2[0].f2_03[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row2[0].f2_04[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row2[0].c2_02[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row2[0].f2_05[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row3[0].p2-cb3[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row3[0].p2-cb3[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row3[0].f2_06[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row3[0].f2_07[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row3[0].c2_03[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row3[0].f2_08[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row4[0].p2-cb4[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row4[0].p2-cb4[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row4[0].f2_09[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row4[0].f2_10[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row4[0].c2_04[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row4[0].f2_11[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row5[0].p2-cb5[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row5[0].p2-cb5[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row5[0].f2_13[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row5[0].f2_14[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row5[0].c2_05[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row5[0].f2_15[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row6[0].p2-cb6[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row6[0].p2-cb6[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row6[0].f2_16[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row6[0].f2_17[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row6[0].c2_06[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row6[0].f2_18[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row7[0].p2-cb7[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row7[0].p2-cb7[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row7[0].f2_19[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row7[0].f2_20[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row7[0].c2_07[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row7[0].f2_21[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row8[0].p2-cb8[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row8[0].p2-cb8[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row8[0].f2_22[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row8[0].f2_23[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row8[0].c2_08[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row8[0].f2_24[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row9[0].p2-cb9[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row9[0].p2-cb9[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row9[0].f2_25[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row9[0].f2_26[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row9[0].c2_09[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row9[0].f2_27[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row10[0].p2-cb10[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row10[0].p2-cb10[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row10[0].f2_28[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row10[0].f2_29[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row10[0].c2_10[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row10[0].f2_30[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row11[0].p2-cb11[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row11[0].p2-cb11[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row11[0].f2_31[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row11[0].f2_32[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row11[0].c2_11[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row11[0].f2_33[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row12[0].p2-cb12[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row12[0].p2-cb12[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row12[0].f2_34[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row12[0].f2_35[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row12[0].c2_12[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row12[0].f2_36[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row13[0].p2-cb13[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row13[0].p2-cb13[1]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row13[0].f2_37[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row13[0].f2_38[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row13[0].c2_13[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0].Row13[0].f2_39[0]': '',
// 'topmostSubform[0].Page2[0].Table1[0]': '',
// 'topmostSubform[0].Page2[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_14[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_15[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_16[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_17[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_18[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_19[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_20[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_21[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_22[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_23[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_24[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_25[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_26[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_27[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_28[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_29[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_30[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_31[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_32[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_33[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_34[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_35[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_36[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_37[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_38[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_39[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_40[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_41[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_42[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN1[0].f3_43[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_42[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_43[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_44[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_45[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_46[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_47[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_48[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_49[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_50[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_51[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_52[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_53[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_54[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_55[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_56[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_57[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_58[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_59[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_60[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_61[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_62[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_63[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_64[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_65[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_66[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_67[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_68[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_69[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_70[0]': '',
// 'topmostSubform[0].Page3[0].PartIVNameEIN2[0].f3_71[0]': '',
// 'topmostSubform[0].Page3[0]': '',
// 'topmostSubform[0]': '',
// }