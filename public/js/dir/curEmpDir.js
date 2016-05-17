angular.module('app')
	.directive('curEmp', function() {

		return{
			templateUrl: '../views/curEmp.html',
			controller: 'compController'
		};
	});