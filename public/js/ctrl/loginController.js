angular.module('app')
	.controller('loginController', function($scope, loginService, $uibModal) {

		 $scope.loggedIn = false;
		 $scope.tests = "test";

		// $scope.postLogin = function(user) {
		// 	// console.log(user);
		// 	return $http ({
		// 		method: 'POST',
		// 		url: '/login',
		// 		data: user
		// 	}).success(function(user) {
		// 		console.log(user);
		// 		if (data === true) {
		// 				$scope.loggedIn = true;

		// 			} else {
		// 				$scope.loggedIn = false;
		// 			}
		// 	});
		// };

		$scope.postLogin = function(user) {
			// console.log(user);
			loginService.postLogin(user).then(function(res) {
				$scope.test = res.data.compName;
				$scope.emp = res.data.emp;
				// console.log(res);

				// console.log(res.data);
				// console.log('loggedIn should be false ' + $scope.loggedIn);
				if (res) {
					$scope.loggedIn = true;
						// console.log('loggedIn should be true ' + $scope.loggedIn);
				} else {
					$scope.loggedIn = false;
				}
			});
		};

		$scope.modalLogin = function() {
			var modalInstance = $uibModal.open({
			templateUrl: '../views/loginModal.html'
		});
	};
		

	});