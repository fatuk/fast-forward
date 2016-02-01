(function () {
	angular.module('gameService', []).
	factory('GameService', [
		'$http',
		'$q',
		'API_PATH',
		'localStorageService',
		'ErrorNotificationService',
		gameService
	]);

	function gameService($http, $q, API_PATH, localStorageService, ErrorNotificationService) {
		var service = {
			getNewGame: getNewGame,
			getResumeGame: getResumeGame,
			getGameProgress: getGameProgress,
			startNewGame: startNewGame,
			deleteGame: deleteGame,
			resetGame: resetGame,
			nextStep: nextStep,
			saveResult: saveResult,
			gameState: app.HAPPY,
			isBlured: false,
			gameInfo: {},
			moduleInfo: {}
		};

		return service;

		function deleteGame(gameId) {
			var url = API_PATH + 'game/' + gameId,
				defer = $q.defer();

			$http.delete(url)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 400:
						errorMsg = 'The model is invalid.';
						break;
					case 403:
						errorMsg = 'Forbidden.';
						break;
					case 404:
						errorMsg = 'The game is not found.';
						break;
					case 406:
						errorMsg = 'The course is not available.';
						break;
					case 500:
						errorMsg = 'Internal server error.';
						break;
					}

					ErrorNotificationService.show(errorMsg, errCode);

					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}

		function saveResult(gameId, moduleData) {
			var url = API_PATH + 'game/' + gameId + '/save-result',
				defer = $q.defer();

			$http.post(url, moduleData)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 400:
						errorMsg = 'The model is invalid.';
						break;
					case 403:
						errorMsg = 'Forbidden.';
						break;
					case 404:
						errorMsg = 'The game or module is not found.';
						break;
					case 406:
						errorMsg = 'The course is not available.';
						break;
					case 409:
						errorMsg = 'The result of the module game already saved.';
						break;
					case 500:
						errorMsg = 'Internal server error.';
						break;
					}

					ErrorNotificationService.show(errorMsg, errCode);

					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}

		function nextStep(gameId) {
			var url = API_PATH + 'game/' + gameId + '/next',
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 403:
						errorMsg = 'Forbidden.';
						break;
					case 404:
						errorMsg = 'The game is not found.';
						break;
					case 406:
						errorMsg = 'The course is not available.';
						break;
					case 409:
						errorMsg = 'Game flow is invalid.';
						break;
					case 410:
						errorMsg = 'Game over';
						break;
					case 500:
						errorMsg = 'Internal server error.';
						break;
					}

					ErrorNotificationService.show(errorMsg, errCode);

					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}

		function resetGame(gameId) {
			var url = API_PATH + 'game/restart/' + gameId,
				defer = $q.defer();

			$http.post(url)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 403:
						errorMsg = 'Forbidden.';
						break;
					case 404:
						errorMsg = 'The game is not found.';
						break;
					case 406:
						errorMsg = 'The course is not available.';
						break;
					case 500:
						errorMsg = 'Internal server error.';
						break;
					}

					ErrorNotificationService.show(errorMsg, errCode);

					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}

		function getNewGame() {
			var url = API_PATH + 'game/get-new-game',
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 500:
						errorMsg = 'Internal server error.';
						break;
					}

					ErrorNotificationService.show(errorMsg, errCode);

					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}

		function getResumeGame() {
			var url = API_PATH + 'game/get-resume-game',
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 500:
						errorMsg = 'Internal server error.';
						break;
					}

					ErrorNotificationService.show(errorMsg, errCode);

					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}

		function getGameProgress(gameId) {
			var url = API_PATH + 'game/position/' + gameId,
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 500:
						errorMsg = 'Internal server error.';
						break;
					}

					ErrorNotificationService.show(errorMsg, errCode);

					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}

		function startNewGame(courseId) {
			var url = API_PATH + 'game/start-new-game/' + courseId,
				defer = $q.defer();

			$http.post(url, courseId)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 500:
						errorMsg = 'Internal server error.';
						break;
					}

					ErrorNotificationService.show(errorMsg, errCode);

					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}
	}
})();
