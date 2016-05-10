angular.module('app')
	.service('compService', function($http) {

		this.getComp = function() {
			return $http ({
				method: 'GET',
				url: '/api/comp'
			});
		};

		this.addComp = function(comp) {
			return $http ({
				method: 'POST',
				url: '/api/comp',
				data: {
					compName: comp.compName,
					address: comp.address,
					city: comp.city,
					state: comp.state,
					zip: comp.zip,
					phone: comp.phone,
					email: comp.email,
					ein: comp.ein,
					password: comp.ein
				}
			});
		};

	});