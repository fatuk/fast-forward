(function () {
	angular.module('welcomeService', []).
	factory('WelcomeService', [
		'$log',
		welcomeService
	]);

	function welcomeService($log) {
		var service = {
			module: {}
		};

		return service;
	}
})();
