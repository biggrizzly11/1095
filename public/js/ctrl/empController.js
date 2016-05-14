angular.module('app')
	.controller('empController', function($scope, compService, user, $state){

			$scope.emp = {}; 
		$scope.addEmp = function(emp) {
			console.log(emp);
			compService.addEmp(emp).then(function(emp) {
				// alert('Congrats ');
				$scope.emp = {};
			});
		};

});
