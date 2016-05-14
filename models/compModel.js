var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Comp = new mongoose.Schema({
	compName: {type: String},
	address: {type: String},
	city: {type: String},
	state: {type: String},
	zip: {type: String},
	phone: {type: String},
	email: {type: String, index: true, trim: true},
	ein: {type: String},
	username: {type: String},
	password: {type: String},
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