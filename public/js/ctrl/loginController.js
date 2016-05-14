angular.module('app')
	.controller('loginController', function($scope, loginService, $uibModal, $state) {

	$scope.modalLogin = function() {
			var modalInstance = $uibModal.open({
			templateUrl: '../views/loginModal.html'
		});
	};

	$scope.login = function() {
		loginService.login($scope.credentials).then(function(response) {
			// console.log(response.data);
			$state.go('company');
		});
	};

	$scope.newUser = {};
	$scope.register = function() {
		loginService.register($scope.newUser).then(function(response) {
			// console.log(response.data);
			$scope.newUser = {};
		});
	};

});

