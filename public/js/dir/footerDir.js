angular.module('app')
	.directive('myFooter', function() {

		return {
			templateUrl: '../views/emp.html',
			controller: 'compController'
		};

	});