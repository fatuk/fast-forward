(function () {
	'use strict';

	angular.module('homeCtrl', [])
		.controller('HomeCtrl', [
			'$scope',
			'ORDER',
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

	function homeCtrl($scope, ORDER, GameFlowService, $log, $location, FINAL_RESULT, IMAGE_SELECT, QUARTER_RESULT, QUIZ, DROP_DOWN, ACTIVITY, INITIATIVE, EVENT, WELCOME_SCREEN, CONSTRUCTOR, NEWSLETTER, BUDGET, localStorageService, GameService) {
		$scope.init = function () {
			$scope.token = localStorageService.get('accessToken');
			$scope.currentGame = localStorageService.get('currentGame');
			$scope.eventCounter = 0;
			$scope.isStop = false;
			$scope.isBreakpoint = false;

			// $scope.resetGame();

			// Watch game flow steps
			$scope.$watch(function () {
				return GameFlowService;
			}, function () {
				$scope.steps = GameFlowService.steps;
			}, true);

			// Watch game info
			$scope.$watch(function () {
				return GameService;
			}, function () {
				$scope.gameInfo = GameService.gameInfo;
				$scope.moduleInfo = GameService.moduleInfo;
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
			$scope.gameInfo = {};
			$scope.eventCounter = 0;
			$scope.isStop = false;

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

			var currentPeriod = $scope.gameInfo.period,
				breakPointPeriod = $scope.breakPointQuarter,
				currentModule = $scope.moduleInfo.moduleType,
				breakPointModule = $scope.breakPointModule;

			if ((currentPeriod === breakPointPeriod) && (currentModule === breakPointModule) && $scope.isBreakpoint) {
				console.log('************************** stop *************************');
				$scope.isStop = true;
			}

			if (!$scope.isStop) {
				GameService.nextStep(currentGame)
					.then(function (data) {
						// Success
						var module = data.modules[0],
							moduleType = module.moduleType,
							activityType = module.activityType,
							currentQuarter = 'q' + $scope.gameInfo.period;

						GameService.gameInfo = data.gameInfo;
						GameService.moduleInfo = module;

						console.log(data);
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
							$scope.saveResult(app.budget[currentQuarter]);
							GameFlowService.steps.push({
								name: 'Budget screen'
							});
							break;
						case EVENT:
							console.log('Event screen');
							$scope.saveResult(app.eventData[$scope.eventCounter]);
							$scope.eventCounter++;
							GameFlowService.steps.push({
								name: 'Event screen'
							});
							break;
						case INITIATIVE:
							console.log('Initiative screen');
							$scope.saveResult(app.initiative[currentQuarter]);
							GameFlowService.steps.push({
								name: 'Initiative screen'
							});
							break;
						case ACTIVITY:
							console.log(activityType);
							switch (activityType) {
							case DROP_DOWN:
								console.log('Activity Drag and Drop screen');
								$scope.saveResult(app.activity[currentQuarter]);
								GameFlowService.steps.push({
									name: 'Activity Drag and Drop screen'
								});
								break;
							case IMAGE_SELECT:
								console.log('Activity Image select screen');
								$scope.saveResult(app.activity[currentQuarter]);
								GameFlowService.steps.push({
									name: 'Activity Image select screen'
								});
								break;
							case SELECT:
								$log.info('Activity Without Image select screen');
								$scope.saveResult(app.activity[currentQuarter]);
								GameFlowService.steps.push({
									name: 'Activity Without Image select screen'
								});
								break;
							case ORDER:
								console.log('Activity Schema screen');
								$scope.saveResult(app.activity[currentQuarter]);
								GameFlowService.steps.push({
									name: 'Activity Schema screen'
								});
								break;
							default:
								console.log('office');
								break;
							}
							break;
						case QUIZ:
							console.log('Quiz screen');
							$scope.saveResult(app.quiz[currentQuarter]);
							GameFlowService.steps.push({
								name: 'Quiz screen'
							});
							break;
						case QUARTER_RESULT:
							console.log('Quarter result screen');
							GameFlowService.steps.push({
								name: 'Quarter result screen'
							});
							$scope.nextStep();
							break;
						case FINAL_RESULT:
							console.log('Final result screen');
							GameFlowService.steps.push({
								name: 'Final result screen'
							});
							$scope.nextStep();
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
			}
		};

		$scope.saveResult = function (moduleData) {
			var currentGame = localStorageService.get('currentGame');

			if (!$scope.isStop) {
				GameService.saveResult(currentGame, moduleData)
					.then(function (data) {
						console.log(data);
						GameService.gameInfo = data.gameInfo;
						$scope.nextStep();
					}, function (err) {
						// Error
						$log.error(err);
					});
			}
		};




		$scope.init();
	}

})();
