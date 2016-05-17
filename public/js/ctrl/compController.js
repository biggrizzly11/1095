angular.module('app')
	.controller('compController', function($scope, compService, loginService, $state) {

		

		var start = function() {
			loginService.getUser().then(function(response){
				if (response._id) {
					$scope.user = response;
					console.log(response);
					$scope.userid = response._id;
					$scope.emps = response.emp;
					// $scope.pdf ='../styles/pdf/f1095' +  response.emp[0] + '.pdf';
					// console.log('pdf: ' + pdf);
					// var pdf = {};
					// var leg = response.emp.length;
					// for (var i = 0; i < leg; i++) {
					// 	pdf = leg[i].pop();
					// }
					// console.log(pdf);
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
			compService.addComp(comp).then(function(comp){
				alert("Congrats your signed up!");
				$scope.comp = {};
			});
		};

		$scope.emp = {}; 
		$scope.addEmp = function(emp, userid) {
			// console.log(userid);
			// console.log(user);
			// console.log(emp);
			compService.addEmp(emp, userid).then(function(emp, userid) {
				// alert('Congrats ');
				$scope.emp = {};
			});
		};

		$scope.logout = function() {
			loginService.logout().then(function(response) {
				$state.go('home');
			});
		};

		$scope.deleteEmp = function(empid) {
			compService.deleteEmp(empid).then(function(response) {
				alert('Employee Deleted');
			});
		};

		$scope.pdf = function(empid) {
			var pdflink = '../styles/pdf/f1095' + empid + '.pdf';
			$scope.cool = pdflink;
			console.log(pdflink);
		};

	});