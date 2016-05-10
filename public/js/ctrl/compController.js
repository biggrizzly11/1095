angular.module('app')
	.controller('compController', function($scope, compService) {

		$scope.test = 'test';


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
			});
		};

	});