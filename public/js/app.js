angular.module('app', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: './views/home.html'
			})
			.state('company', {
				url: '/company',
				templateUrl: './views/company.html'
			})
			.state('signup', {
				url: '/signup',
				templateUrl: './views/signup.html'
			})
			.state('login', {
				url: '/login',
				templateUrl: './views/login.html'
			})
			.state('emp', {
				url: '/emp',
				templateUrl: './views/emp.html'
			})
			.state('forms', {
				url: '/forms',
				templateUrl: './views/forms.html'
			});

	});