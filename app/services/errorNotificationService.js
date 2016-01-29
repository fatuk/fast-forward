(function () {
	'use strict';
	angular.module('errorNotificationService', []).
	factory('ErrorNotificationService', [
		'$log',
		'AuthInterceptorService',
		errorNotificationService
	]);

	function errorNotificationService(ModalsService, $log, AuthInterceptorService) {
		var service = {
			show: show
		};
		return service;

		function show(errorMsg, code) {
			if (!AuthInterceptorService.isError) {
				alert(errorMsg);
				AuthInterceptorService.isError = true;
			}
		}
	}
})();
