var User = require('../models/UserModel');
var pdffiller = require('pdffiller');

module.exports = {

	get1094: function(req, res) {
		User.findById(req.params.id)
		.exec(function(err, s) {

			var comp = s;
			// console.log(s);
			// console.log('compName: '+ comp.name);

		var data = {
			'EIN36': '',
			'51': '',
			'EIN37': '',
			'52': '',
			'EIN38': '',
			'53': '',
			'EIN39': '',
			'54': '',
			'EIN40': '',
			'55': '',
			'EIN41': '',
			'56': '',
			'EIN42': '',
			'57': '',
			'EIN43': '',
			'58': '',
			'EIN44': '',
			'59': '',
			'EIN45': '',
			'60': '',
			'EIN46': '',
			'61': '',
			'EIN47': '',
			'62': '',
			'EIN48': '',
			'63': '',
			'EIN49': '',
			'64': '',
			'EIN50': '',
			'65': '',
			'1_1': comp.name,
			'1_2': comp.ein,
			'1_3': comp.address,
			'1_4': comp.city,
			'1_5': comp.state,
			'1_6': comp.zip,
			'1_7': comp.contName,
			'1_8': comp.contNum,
			'1_9': comp.govEntity,
			'1_10': comp.ein,
			'1_11': comp.contAddress,
			'1_12': comp.contCity,
			'1_13': comp.contState,
			'1_14': comp.contZip,
			'1_15': comp.contName,
			'1_16': comp.contNum,
			'1_18': comp.totalnumber,
			'1_17': '',
			'Text132': comp.transmittalX,
			'2_21_yes': comp.isALEmembyes,
			'2_21_no': comp.isALEmembno,
			'2_22_a': comp.elia,
			'2_22_B': comp.elib,
			'2_22_c': comp.elic,
			'2_22_d': comp.elid,
			'3_23_yes': comp.allYes23,
			'3_23_no': comp.allNo23,
			'23d': comp.agg23,
			'24d': comp.agg24,
			'25d': comp.agg25,
			'26d': comp.agg26,
			'27d': comp.agg27,
			'28d': comp.agg28,
			'29d': comp.agg29,
			'30d': comp.agg30,
			'31d': comp.agg31,
			'32d': comp.agg32,
			'33d': comp.agg33,
			'34d': comp.agg34,
			'35d': comp.agg35,
			'23b': comp.full23,
			'23c': comp.total23,
			'23e': comp.sec23,
			'3_24_yes': comp.janYes24,
			'3_24_no': comp.janNo24,
			'24b': comp.full24,
			'24c': comp.total24,
			'24e': comp.sec24,
			'3_25_yes': comp.febYes25,
			'3_25_no': comp.febNo25,
			'25b': comp.full25,
			'25c': comp.total25,
			'25e': comp.sec25,
			'3_26_yes': comp.marYes26,
			'3_26_no': comp.marNo26,
			'26b': comp.full26,
			'26c': comp.total26,
			'26e': comp.sec26,
			'3_27_yes': comp.aprYes27,
			'3_27_no': comp.aprNo27,
			'27b': comp.full27,
			'27c': comp.total27,
			'27e': comp.sec27,
			'3_28_yes': comp.mayYes28,
			'3_28_no': comp.mayNo28,
			'28b': comp.full28,
			'28c': comp.total28,
			'28e': comp.sec28,
			'3_29_yes': comp.juneYes29,
			'3_29_no': comp.juneNo29,
			'29b': comp.full29,
			'29c': comp.total29,
			'29e': comp.sec29,
			'3_30_yes': comp.julyYes30,
			'3_30_no': comp.julyNo30,
			'30b': comp.full30,
			'30c': comp.total30,
			'30e': comp.sec30,
			'3_31_yes': comp.augYes31,
			'3_31_no': comp.augNo31,
			'31b': comp.full31,
			'31c': comp.total31,
			'31e': comp.sec31,
			'3_32_yes': comp.septYes32,
			'3_32_no': comp.septNo32,
			'32b': comp.full32,
			'32c': comp.total32,
			'32e': comp.sec32,
			'3_33_yes': comp.octYes33,
			'3_33_no': comp.octNo33,
			'33b': comp.full33,
			'33c': comp.total33,
			'33e': comp.sec33,
			'3_34_yes': comp.novYes34,
			'3_34_no': comp.novNo34,
			'34b': comp.full34,
			'34c': comp.total34,
			'34e': comp.sec34,
			'3_35_yes': comp.decYes35,
			'3_35_no': comp.decNo35,
			'35b': comp.full35,
			'35c': comp.total35,
			'35e': comp.sec35,
			'corrected': comp.corrected,
			};

			var sourcePdf = 'f1094c.pdf';
			var desPdf = 'public/styles/pdf/f1094'+ comp._id + '.pdf';
			pdffiller.fillForm(sourcePdf, desPdf, data, function(err) {

				}); 

		});
	}
};