(function () {
	angular.module('authInterceptorService', [])
		.factory('AuthInterceptorService', [
			'$rootScope',
			'$q',
			'$location',
			'localStorageService',
			'$timeout',
			authInterceptorService
		]);

	function authInterceptorService($rootScope, $q, $location, localStorageService, $timeout) {
		var service = {
			request: request,
			response: response,
			responseError: responseError,
			numLoadings: 0
		};

		return service;

		function request(config) {
			var accessToken = localStorageService.get('accessToken');

			config.headers = config.headers || {};
			service.numLoadings++;

			if (accessToken) {
				config.headers.Authorization = 'AccessToken ' + accessToken;
			}
			service.isError = false;
			$rootScope.$broadcast('loaderShow');
			return config || $q.when(config);
		}

		function response(responseData) {
			var spinnerDelay = 100;

			$timeout(function () {
				if ((--service.numLoadings) === 0) {
					$rootScope.$broadcast('loaderHide');
				}
			}, spinnerDelay);

			return responseData || $q.when(responseData);
		}

		function responseError(rejection) {
			if (!(--service.numLoadings)) {
				$rootScope.$broadcast('loaderHide');
			}

			if (rejection.status === 401) {
				localStorageService.clearAll();
				$location.path('/');
			}
			if (rejection.status === 410) {
				$location.path('/home');
			}
			return $q.reject(rejection);
		}
	}
})();
