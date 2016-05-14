angular.module('app', ['ui.router', 'ui.bootstrap'])
	.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: './views/home.html'
			})
			.state('company', {
				url: '/company',
				templateUrl: './views/company.html',
				controller: 'compController',
			})
			.state('signup', {
				url: '/signup',
				templateUrl: './views/signup.html',
				controller: 'loginController'
			})
			.state('login', {
				url: '/login',
				templateUrl: './views/login.html',
				controller: 'loginController'
			})
			.state('emp', {
				url: '/emp',
				templateUrl: './views/emp.html'
			})
			.state('forms', {
				url: '/forms',
				templateUrl: './views/forms.html'
			})
			.state('upload', {
				url: '/upload',
				templateUrl: './views/upload.html'
			});

	});