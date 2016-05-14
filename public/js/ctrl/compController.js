angular.module('app')
	.controller('compController', function($scope, compService, loginService, $state) {

		

		var start = function() {
			loginService.getUser().then(function(response){
				if (response._id) {
					$scope.user = response;
					$state.go('company');
				}
			});
		}();


		$scope.getComp = function() {
			compService.getComp().then(function(res) {
				// console.log(res.data);
				$scope.comp = res.data;
			});
		};

		$scope.getComp();

		$scope.comp = {};
		$scope.addComp = function(comp) {
			console.log(comp);
			compService.addComp(comp).then(function(comp){
				alert("Congrats your signed up!");
				$scope.comp = {};
			});
		};

		$scope.emp = {}; 
		$scope.addEmp = function(emp) {
			// console.log(emp);
			compService.addEmp(emp).then(function(emp) {
				// alert('Congrats ');
				$scope.emp = {};
			});
		};

		$scope.logout = function() {
			loginService.logout().then(function(response) {
				$state.go('home');
			});
		};

	});