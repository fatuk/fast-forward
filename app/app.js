var app = angular.module('myApp', [
		'ngRoute',
		'LocalStorageModule',

		'mainCtrl',
		'homeCtrl',

		'characterService',
		'userService',
		'authService',
		'gameService',
		'leaderboardService',
		'errorNotificationService',
		'gameFlowService',
		'authInterceptorService'
	])
	.config([
		'$routeProvider',
		'localStorageServiceProvider',
		function ($routeProvider, localStorageServiceProvider) {
			'use strict';

			$routeProvider
				.when('/', {
					redirectTo: '/home'
				})
				.when('/home', {
					controller: 'HomeCtrl',
					templateUrl: 'views/home.html'
				})
				.otherwise({
					redirectTo: '/home'
				});

			// Local storage config
			localStorageServiceProvider
				.setPrefix('lighthouse')
				.setStorageType('localStorage');
		}
	])
	.config(function ($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptorService');
	});

app.constant('API_PATH', '/api/v1/');
app.constant('WELCOME_SCREEN', 'WelcomeScreen');
app.constant('CONSTRUCTOR', 'Constructor');
app.constant('NEWSLETTER', 'Newsletter');
app.constant('BUDGET', 'Budget');
app.constant('EVENT', 'Event');
app.constant('INITIATIVE', 'Initiative');
app.constant('ACTIVITY', 'Activity');
app.constant('DROP_DOWN', 'DropDown');
app.constant('QUIZ', 'Quiz');
app.constant('QUARTER_RESULT', 'QuarterResult');
app.constant('IMAGE_SELECT', 'ImageSelect');
app.constant('FINAL_RESULT', 'FinalResult');
app.constant('ORDER', 'Order');
app.constant('SELECT', 'Select');
