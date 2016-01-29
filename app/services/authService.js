(function () {
	'use strict';
	angular.module('authService', []).
	factory('AuthService', [
		'$http',
		'$q',
		'API_PATH',
		'localStorageService',
		'ErrorNotificationService',
		'UserService',
		authService
	]);

	function authService($http, $q, API_PATH, localStorageService, ErrorNotificationService, UserService) {
		var service = {
			signIn: signIn,
			signOut: signOut,
			setPassword: setPassword,
			changePassword: changePassword,
			forgotPassword: forgotPassword,
			resetPassword: resetPassword
		};
		return service;

		function signIn(authData) {
			var url = API_PATH + 'users/signin',
				defer = $q.defer();

			$http.post(url, authData)
				.success(function (data) {
					console.log(data);
					localStorageService.set('accessToken', data.accessToken);
					localStorageService.set('isSetPassword', data.isSetPassword);
					UserService.isAuth = true;
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

		function signOut() {
			var url = API_PATH + 'users/signout',
				defer = $q.defer();

			$http.post(url)
				.success(function (data) {
					localStorageService.clearAll();
					UserService.isAuth = false;
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

		function setPassword(authData) {
			var url = API_PATH + 'users/set-password',
				defer = $q.defer();

			$http.put(url, authData)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 400:
						errorMsg = 'Invalid data. Try again.';
						break;
					case 403:
						errorMsg = 'User already activated.';
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

		function changePassword(authData) {
			var url = API_PATH + 'users/change-password',
				defer = $q.defer();

			$http.put(url, authData)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 400:
						errorMsg = 'Invalid data. Try again.';
						break;
					case 403:
						errorMsg = 'Old password not correct.';
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

		function forgotPassword(authData) {
			var url = API_PATH + 'users/forget-password',
				defer = $q.defer();

			$http.post(url, authData)
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

		function resetPassword(authData) {
			var url = API_PATH + 'users/reset-password',
				defer = $q.defer();

			$http.post(url, authData)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 400:
						errorMsg = 'Invalid data. Try again.';
						break;
					case 403:
						errorMsg = 'The key validity period has expired.';
						break;
					case 404:
						errorMsg = 'The restore request was not found.';
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
	}
})();
