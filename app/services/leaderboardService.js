(function () {
	angular.module('leaderboardService', []).
	factory('LeaderboardService', [
		'$http',
		'$q',
		'API_PATH',
		'ErrorNotificationService',
		leaderboardService
	]);

	function leaderboardService($http, $q, API_PATH, ErrorNotificationService) {
		var service = {
			getLeaderboards: getLeaderboards,
			getLeaderboard: getLeaderboard,
			postLeaderboard: postLeaderboard,
			allTime: false,
			postedLeaderboard: null,
			currentLeaderboard: null,
			currentLeaderboardId: null
		};

		return service;

		function postLeaderboard(gameId) {
			var url = API_PATH + 'leaderboard/post-leaderboard/' + gameId + '?allTime=' + service.allTime,
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

		function getLeaderboards() {
			var url = API_PATH + 'leaderboard/get-list?allTime=' + service.allTime,
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

		function getLeaderboard(courseId) {
			var url = API_PATH + 'leaderboard/' + courseId + '?allTime=' + service.allTime,
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					service.currentLeaderboard = data;
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
