var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var User = new mongoose.Schema({
  name: { type: String, default: ''},
  address: {type: String, default: ''},
  city: {type: String, default: ''},
  state: {type: String, default: ''},
  zip: {type: String, default: ''},
  phone: {type: String, default: ''},
  ein: {type: String, default: ''},
  email: { type: String, index: true, trim: true, default: '' },
  password: { type: String },
  contName: {type: String, default: ''},
  contNum: {type: String, default: ''},
  govEntity: {type: String, default: ''},
  contAddress: {type: String, default: ''},
  contCity: {type: String, default: ''},
  contState: {type: String, default: ''},
  contZip: {type: String, default: ''},
  totalnumber: {type: String, default: ''},
  transmittalX: {type: String, default: ''},
  isALEmembyes: {type: String, default: ''},
  isALEmembno: {type: String, default: ''},
  elia: {type: String, default: ''},
  elib: {type: String, default: ''},
  elic: {type: String, default: ''},
  elid: {type: String, default: ''},
  allYes23: {type: String, default: ''},
  allNo23: {type: String, default: ''},
  full23: {type: String, default: ''},
  total23: {type: String, default: ''},
  agg23: {type: String, default: ''},
  sec23: {type: String, default: ''},
  janYes24: {type: String, default: ''},
  janNo24: {type: String, default: ''},
  full24: {type: String, default: ''},
  total24: {type: String, default: ''},
  agg24: {type: String, default: ''},
  sec24: {type: String, default: ''},
  febYes25: {type: String, default: ''},
  febNo25: {type: String, default: ''},
  full25: {type: String, default: ''},
  total25: {type: String, default: ''},
  agg25: {type: String, default: ''},
  sec25: {type: String, default: ''},
  marYes26: {type: String, default: ''},
  marNo26: {type: String, default: ''},
  full26: {type: String, default: ''},
  total26: {type: String, default: ''},
  agg26: {type: String, default: ''},
  sec26: {type: String, default: ''},
  aprYes27: {type: String, default: ''},
  aprNo27: {type: String, default: ''},
  full27: {type: String, default: ''},
  total27: {type: String, default: ''},
  agg27: {type: String, default: ''},
  sec27: {type: String, default: ''},
  mayYes28: {type: String, default: ''},
  mayNo28: {type: String, default: ''},
  full28: {type: String, default: ''},
  total28: {type: String, default: ''},
  agg28: {type: String, default: ''},
  sec28: {type: String, default: ''},
  juneYes29: {type: String, default: ''},
  juneNo29: {type: String, default: ''},
  full29: {type: String, default: ''},
  total29: {type: String, default: ''},
  agg29: {type: String, default: ''},
  sec29: {type: String, default: ''},
  julyYes30: {type: String, default: ''},
  julyNo30: {type: String, default: ''},
  full30: {type: String, default: ''},
  total30: {type: String, default: ''},
  agg30: {type: String, default: ''},
  sec30: {type: String, default: ''},
  augYes31: {type: String, default: ''},
  augNo31: {type: String, default: ''},
  full31: {type: String, default: ''},
  total31: {type: String, default: ''},
  agg31: {type: String, default: ''},
  sec31: {type: String, default: ''},
  septYes32: {type: String, default: ''},
  septNo32: {type: String, default: ''},
  full32: {type: String, default: ''},
  total32: {type: String, default: ''},
  agg32: {type: String, default: ''},
  sec32: {type: String, default: ''},
  octYes33: {type: String, default: ''},
  octNo33: {type: String, default: ''},
  full33: {type: String, default: ''},
  total33: {type: String, default: ''},
  agg33: {type: String, default: ''},
  sec33: {type: String, default: ''},
  novYes34: {type: String, default: ''},
  novNo34: {type: String, default: ''},
  full34: {type: String, default: ''},
  total34: {type: String, default: ''},
  agg34: {type: String, default: ''},
  sec34: {type: String, default: ''},
  decYes35: {type: String, default: ''},
  decNo35: {type: String, default: ''},
  full35: {type: String, default: ''},
  total35: {type: String, default: ''},
  agg35: {type: String, default: ''},
  sec35: {type: String, default: ''},
  corrected: {type: String, default: ''},
  emp: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Emp'
    }
  ]
});

User.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

User.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', User);