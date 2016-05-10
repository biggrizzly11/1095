var mongoose = require('mongoose');

var empSchema = new mongoose.Schema({
	name: {type: String, require: true},
	address: {type: String, require: true},
	city: {type: String, require: true},
	state: {type: String, require: true},
	zip: {type: Number, require: true},
	ssn: {type: Number, require: true},
});

module.exports = mongoose.model("Emp", empSchema);