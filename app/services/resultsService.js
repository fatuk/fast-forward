(function () {
	angular.module('resultsService', []).
	factory('ResultsService', [
		'$log',
		resultsService
	]);

	function resultsService($log) {
		var service = {
			quarterResults: {},
			activityResults: {},
			finalResults: {},
			eventResults: {},
			initiativeResults: {}
		};

		return service;
	}
})();
