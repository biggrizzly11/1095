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
			});

	});