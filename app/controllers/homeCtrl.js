(function () {
	'use strict';

	angular.module('homeCtrl', [])
		.controller('HomeCtrl', [
			'$scope',
			'GameFlowService',
			'$log',
			'$location',
			'FINAL_RESULT',
			'IMAGE_SELECT',
			'QUARTER_RESULT',
			'QUIZ',
			'DROP_DOWN',
			'ACTIVITY',
			'INITIATIVE',
			'EVENT',
			'WELCOME_SCREEN',
			'CONSTRUCTOR',
			'NEWSLETTER',
			'BUDGET',
			'localStorageService',
			'GameService',
			homeCtrl
		]);

	function homeCtrl($scope, GameFlowService, $log, $location, FINAL_RESULT, IMAGE_SELECT, QUARTER_RESULT, QUIZ, DROP_DOWN, ACTIVITY, INITIATIVE, EVENT, WELCOME_SCREEN, CONSTRUCTOR, NEWSLETTER, BUDGET, localStorageService, GameService) {
		$scope.init = function () {
			$scope.token = localStorageService.get('accessToken');
			$scope.currentGame = localStorageService.get('currentGame');

			// Watch game flow steps
			$scope.$watch(function () {
				return GameFlowService;
			}, function () {
				$scope.steps = GameFlowService.steps;
			}, true);
		};

		$scope.saveData = function () {
			localStorageService.set('accessToken', $scope.token);
			localStorageService.set('currentGame', $scope.currentGame);
		};

		$scope.startGame = function () {
			$scope.nextStep();
		};

		$scope.deleteGame = function () {
			var currentGame = localStorageService.get('currentGame');
			GameService.deleteGame(currentGame)
				.then(function (data) {
					// Success
					console.log(data);
					console.log('Game deleted');
				}, function (err) {
					// Error
					$log.error(err);
				});
		};

		$scope.resetGame = function () {
			var currentGame = localStorageService.get('currentGame');
			$scope.steps = [];

			GameService.resetGame(currentGame)
				.then(function (data) {
					// Success
					console.log('Game reseted');
				}, function (err) {
					// Error
					$log.error(err);
				});
		};

		$scope.nextStep = function () {
			var currentGame = localStorageService.get('currentGame');

			GameService.nextStep(currentGame)
				.then(function (data) {
					// Success
					var module = data.modules[0],
						moduleType = module.moduleType,
						activityType = module.activityType;

					GameService.gameInfo = data.gameInfo;

					// console.log('Next step', data);
					switch (moduleType) {
					case WELCOME_SCREEN:
						console.log('Welcome screen');
						GameFlowService.steps.push({
							name: 'Welcome screen'
						});
						$scope.nextStep();
						break;
					case NEWSLETTER:
						console.log('Newsletter screen');
						GameFlowService.steps.push({
							name: 'Newsletter screen'
						});
						$scope.nextStep();
						break;
					case BUDGET:
						console.log('Budget screen');
						GameFlowService.steps.push({
							name: 'Budget screen'
						});
						break;
					case EVENT:
						console.log('Event screen');
						break;
					case INITIATIVE:
						console.log('Initiative screen');
						break;
					case ACTIVITY:
						console.log(activityType);
						switch (activityType) {
						case DROP_DOWN:
							console.log('Activity DropDown screen');
							break;
						case IMAGE_SELECT:
							console.log('Activity Image select screen');
							break;
						default:
							console.log('office');
							break;
						}
						break;
					case QUIZ:
						console.log('Quiz screen');
						break;
					case QUARTER_RESULT:
						console.log('Quarter result screen');
						break;
					case FINAL_RESULT:
						console.log('Final result screen');
						break;
					default:
						console.log('office');
						break;
					}

					return data;

				}, function (err) {
					// Error
					$log.error(err);
				});
		};




		$scope.init();
	}

})();
