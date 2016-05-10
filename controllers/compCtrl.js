var Comp = require('../models/compModel');
var Emp = require('../models/empModel');

module.exports = {
	compCreate: function(req, res) {
		var newComp = new Comp(req.body);
		newComp.save(function(err, s) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(s);
			}
		});
	},

	compRead: function(req, res) {
		Comp.find({})
			.populate({path: 'emp', select: 'name address _id'})
			.exec(function(err, s) {
				if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(s);
			}
		});
	},

	compUpdate: function(req, res) {
		Comp.findByIdAndUpdate(req.params.id, req.body, function(err, s) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(s);
			}
		});
	},

	compDelete: function(req, res) {
		Comp.findByIdAndRemove(req.params.id, function(err, s) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(s);
			}
		});
	},

	compAddEmp: function(req, res) {
		Comp.findById(req.params.id, function(err1, res1) {
			var comp = res1;
			comp.emp.push(req.body);
			console.log(req.body);
			Comp.findByIdAndUpdate(comp._id, comp, function(err2, res2) {
				if (err2) {
				res.status(500).json(err2);
				} else	{
					res.status(200).json(res2);
				}
			});
		});
	},

};









