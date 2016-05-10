var mongoose = require('mongoose');

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

module.exports = mongoose.model("Comp", compSchema);