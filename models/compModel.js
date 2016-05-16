var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Comp = new mongoose.Schema({
	compName: {type: String, default: ''},
	address: {type: String, default: ''},
	city: {type: String, default: ''},
	state: {type: String, default: ''},
	zip: {type: String, default: ''},
	phone: {type: String, default: ''},
	email: {type: String, index: true, trim: true, default: ''},
	ein: {type: String, default: ''},
	username: {type: String, default: ''},
	password: {type: String, default: ''},
	emp: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Emp"
		}
	]

});

// compSchema.pre('save', function(next) {
// 	var user = this;
// 	if (!user.isModified('password')) return next();
// 	var salt = bcrypt.genSaltSync(10);
// 	var hash = bcrypt.hashSync(user.password, salt);
// 	user.password = hash;
// 	return next(null, user);
// });

// compSchema.methods.verifyPassword = function(reqBodyPassword) {
// 	var user = this;
// 	return bcrypt.compareSync(reqBodyPassword, user.password);
// };

Comp.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  	var salt = bcrypt.genSaltSync(10);
 	 var hash = bcrypt.hashSync(user.password, salt);
 	 user.password = hash;
  	return next(null, user);
});

Comp.methods.verifyPassword = function(reqBodyPassword) {
 	 var user = this;
 	 return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('Comp', Comp);