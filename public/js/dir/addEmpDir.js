angular.module('app')
	.directive('myEmp', function() {

		return {
			templateUrl: '../views/emp.html',
			controller: 'compController'
		};

	});