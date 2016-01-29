(function () {
	'use strict';
	angular.module('gameFlowService', []).
	factory('GameFlowService', [
		'$log',
		gameFlowService
	]);

	function gameFlowService($log) {
		var service = {
			steps: [],
			period: 1
		};
		return service;
	}
})();
