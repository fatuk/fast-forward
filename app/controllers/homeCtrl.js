(function () {
	'use strict';

	angular.module('homeCtrl', [])
		.controller('HomeCtrl', [
			'$scope',
			'localStorageService',
			'GameService',
			homeCtrl
		]);

	function homeCtrl($scope, localStorageService, GameService) {
		$scope.init = function () {
			$scope.token = localStorageService.get('accessToken');
			$scope.currentGame = localStorageService.get('currentGame');


		};

		$scope.saveData = function () {
			localStorageService.set('accessToken', $scope.token);
			localStorageService.set('currentGame', $scope.currentGame);
		};

		$scope.startGame = function () {
			$scope.nextStep();
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

					console.log('Next step', data);
					ngDialog.closeAll();
					switch (moduleType) {
					case WELCOME_SCREEN:
						console.log('Welcome screen');
						WelcomeService.module = module;
						break;
					case CONSTRUCTOR:
						console.log('Constructor screen');
						break;
					case NEWSLETTER:
						console.log('Newsletter screen');
						$scope.go('/office');
						NewslettersService.items = data.modules;
						NewslettersService.period = data.gameInfo.period;
						break;
					case BUDGET:
						console.log('Budget screen');
						$location.path('/budget');
						break;
					case EVENT:
						console.log('Event screen');
						$location.path('/event');
						break;
					case INITIATIVE:
						console.log('Initiative screen');
						$location.path('/initiatives');
						break;
					case ACTIVITY:
						console.log(activityType);
						switch (activityType) {
						case DROP_DOWN:
							console.log('Activity DropDown screen');
							$location.path('/activity-drag');
							break;
						case IMAGE_SELECT:
							console.log('Activity Image select screen');
							$location.path('/activity-select-with-img');
							break;
						default:
							$location.path('/office');
							console.log('office');
							break;
						}
						break;
					case QUIZ:
						console.log('Quiz screen');
						QuizService.items = data.modules;
						break;
					case QUARTER_RESULT:
						console.log('Quarter result screen');
						ResultsService.quarterResults = data.modules[0];
						break;
					case FINAL_RESULT:
						console.log('Final result screen');
						ResultsService.finalResults = data.modules[0];
						break;
					default:
						$location.path('/office');
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
