angular.module('app')
	.service('loginService', function($http) {

		this.postLogin = function(user) {
			console.log(user);
			return $http ({
				method: 'POST',
				url: '/login',
				data: user
			});
		};

	});