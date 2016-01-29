(function () {
	angular.module('quizService', []).
	factory('QuizService', [
		'$log',
		quizService
	]);

	function quizService($log) {
		var service = {
			module: {},
			items: [],
			counter: 0,
			answers: [],
			currentAnswer: {}
		};

		return service;
	}
})();
