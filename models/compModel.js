var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// var Emp = require('empModel');

var compSchema = new mongoose.Schema({
	compName: {type: String},
	address: {type: String},
	city: {type: String},
	state: {type: String},
	zip: {type: String},
	phone: {type: String},
	email: {type: String},
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

compSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

compSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

compSchema.pre('save', function(next){
	var user = this;
	if (!user.isModified('password')) return next();
	user.password = compSchema.methods.generateHash(user.password);
});

module.exports = mongoose.model("Comp", compSchema);