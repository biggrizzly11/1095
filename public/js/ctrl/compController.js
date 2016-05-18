angular.module('app')
	.controller('compController', function($scope, compService, loginService, $state) {

		

		var start = function() {
			loginService.getUser().then(function(response){
				if (response._id) {
					$scope.user = response;
					// console.log(response);
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
			$state.reload();
		};

		$scope.logout = function() {
			loginService.logout().then(function(response) {
				$state.go('home');
			});
		};

		$scope.deleteEmp = function(empid) {
			compService.deleteEmp(empid).then(function(response) {
				// alert('Employee Deleted');
				$state.reload();
			});
		};

		$scope.pdf = function(empid) {
			var pdflink = '../styles/pdf/f1095' + empid + '.pdf';
			$scope.cool = pdflink;
			console.log(pdflink);
		};

		$scope.genForm = function(userid) {
			compService.genForm(userid).then(function(response) {
				$state.reload();
			});
		};

		$scope.user = {};
		$scope.updateUser = function(user, userid) {
				console.log('comp: '+ user);
				console.log('compid: ' + userid);
			compService.updateUser(user, userid).then(function(user, userid) {
				
			});

			compService.genForm94(userid).then(function(response){

			});

			$state.reload();

		};

		

		$scope.pdf94 = function(userid) {
			var pdflink94 = '../styles/pdf/f1094' + userid + '.pdf';
			$scope.pdf94 = pdflink94;
			
		};

		

		
		$scope.uploadFile = function(){
			var file = $scope.file;
			console.log('file: ' + file);


			//var csv is the CSV file with headers
				// function csvJSON(csv){

				//   var lines=csv.split("\n");

				//   var result = [];

				//   var headers=lines[0].split(",");

				//   for(var i=1;i<lines.length;i++){

				// 	  var obj = {};
				// 	  var currentline=lines[i].split(",");

				// 	  for(var j=0;j<headers.length;j++){
				// 		  obj[headers[j]] = currentline[j];
				// 	  }

				// 	  result.push(obj);

				//   }
				  
				//   //return result; //JavaScript object
				//   return JSON.stringify(result); //JSON
				// }
		};

		// $scope.genForm94 = function(userid) {
		// 	console.log('userid: ' + userid);
		// 	compService.genForm94(userid).then(function(response){

		// 	});
		// };

	});