(function () {
	'use strict';
	angular.module('newslettersService', []).
	factory('NewslettersService', [
		'$log',
		newslettersService
	]);

	function newslettersService($log) {
		var service = {
			items: [],
			period: 1
		};
		return service;
	}
})();
