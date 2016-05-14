angular.module('app')
	.service('loginService', function($http) {

		this.login = function(user) {
			return $http ({
				method: 'POST',
				url: '/login',
				data: user
			}).then(function(response) {
				return response;
			});
		};

		this.logout = function() {
			return $http ({
				method: 'GET',
				url: '/logout'
			}).then(function(response) {
				return response;
			});
		};

		this.getUser = function() {
			return $http({
				method: 'GET',
				url: '/me'
			}).then(function(response) {
				return response.data;
			});
		};

		this.register = function(user) {
			return $http({
				method: 'POST',
				url: '/users',
				data: user
			}).then(function(response){
				return response;
			});
		};

	});