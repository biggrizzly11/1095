var Comp = require('../models/compModel');
var Emp = require('../models/empModel');
var User = require('../models/UserModel');

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
			.populate(
				{path: 'emp', select: '_id'}
				)
			.populate(
					{path: 'emp', select: 'name'}
				)
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

	getCurrentUser: function(req, res) {
		// console.log(req);
		if (req.user) {
			res.status(200).send(req.user);
		} else {
			res.status(403).send('forbidden');
		}
	},

	getTotal: function(req, res) {
		Comp.findById(req.params.id, function(err, s) {
			if (err) {
				res.status(500).json(err);
			} else {
				// console.log(s.emp);
				// var num = 0;
				// var len = s.emp.length;
				// console.log(len);
				// for (var i = 0; i < len; i++) {
				// 	console.log(num);
				// 	if (len[i] === false) {
				// 		num ++;
				// 		console.log(num);
				// 	}
				// }
				res.status(200).json(s.emp.length);
			}
		});
	},

	me: function(req, res) {
		// console.log(req);
		if (!req.user) return res.status(401).send('Current User Not Defined');
		req.user.password = null;
		return res.status(200).json(req.user);
	},

	register: function(req, res) {
		User.create(req.body, function(err, result) {
			if(err) return res.status(500).send(err);
			newUser = result.toObject();
			newUser.password = null;
			res.status(200).json(newUser);
		});
	},

// For Testing purposes
	getUser: function(req, res) {
		User.find({})
			.exec(function(err, s) {
				if (err) {
					res.status(500).json(err);
				} else {
					res.status(200).json(s);
				}
			});
	}

};









