(function () {
	angular.module('userService', []).
	factory('UserService', [
		'$http',
		'$q',
		'API_PATH',
		'localStorageService',
		'ErrorNotificationService',
		userService
	]);

	function userService($http, $q, API_PATH, localStorageService, ErrorNotificationService) {
		var service = {
			editProfile: editProfile,
			getInfo: getInfo,
			isAuth: false
		};

		if (localStorageService.get('accessToken')) {
			service.isAuth = true;
		}

		return service;

		function editProfile(userData) {
			var url = API_PATH + 'users/edit-profile',
				defer = $q.defer();

			$http.put(url, userData)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 400:
						errorMsg = 'Invalid data. Try again.';
						break;
					case 404:
						errorMsg = 'User was not found.';
						break;
					case 409:
						errorMsg = 'The user with this username already exists.';
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

		function getInfo() {
			var url = API_PATH + 'users/get-info',
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					data.userInfo.fullname = data.userInfo.firstname + ' ' + data.userInfo.lastname;
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
