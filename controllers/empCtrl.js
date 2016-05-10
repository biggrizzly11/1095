var Emp = require('../models/empModel');

module.exports = {
	empCreate: function(req, res) {
		var newEmp = new Emp(req.body);
		newEmp.save(function(err, s) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(s);
			}
		});
	},

	empRead: function(req, res) {
		Emp.find()
			.exec(function(err, s) {
				if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(s);
			}
		});
	},

	empUpdate: function(req, res) {
		Emp.findByIdAndUpdate(req.params.id, req.body, function(err, s) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(s);
			}
		});
	},

	empDelete: function(req, res) {
		Emp.findByIdAndRemove(req.params.id, function(err, s) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(s);
			}
		});
	}



};











