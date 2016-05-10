angular.module('app')
	.controller('loginController', function($scope, loginService) {

		// $scope.test = 'test';

		$scope.postLogin = function(user) {
			// console.log(user);
			loginService.postLogin(user).then(function(res) {
			});
		};

	});