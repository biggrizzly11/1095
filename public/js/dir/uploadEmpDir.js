angular.module('app')
	.directive('uploadEmp', function() {

		return {
			templateUrl: '../views/upload.html',
			controller: 'compController'
		};

	});