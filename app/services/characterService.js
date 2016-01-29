(function () {
	'use strict';
	angular.module('characterService', []).
	factory('CharacterService', [
		'$http',
		'$q',
		'API_PATH',
		'ErrorNotificationService',
		'$log',
		characterService
	]);

	function characterService($http, $q, API_PATH, ErrorNotificationService, $log) {
		var service = {
			getBodyParts: getBodyParts,
			renderCharacter: renderCharacter,
			getCharacter: getCharacter,
			editCharacter: editCharacter,
			getById: getById,
			character: {},
			preview: {},
			bodyParts: {}
		};

		return service;

		function getBodyParts() {
			var url = 'data/bodyParts.json',
				defer = $q.defer();
			$http.get(url)
				.success(function (data) {
					service.isBodyParts = true;
					service.bodyParts = data;
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 404:
						errorMsg = 'File is not found.';
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

		function renderCharacter() {
			var skin = service.getById(service.bodyParts.skinTones, service.character.skin),
				maleHead = service.getById(service.bodyParts.maleHeads, service.character.head),
				femaleHead = service.getById(service.bodyParts.femaleHeads, service.character.head),
				maleShirt = service.getById(service.bodyParts.maleShirts, service.character.shirt),
				femaleShirt = service.getById(service.bodyParts.femaleShirts, service.character.shirt),
				pants = service.getById(service.bodyParts.pants, service.character.pants),
				skirt = service.getById(service.bodyParts.skirts, service.character.pants);

			// Update skin
			service.preview.skin = skin || service.getById(service.bodyParts.skinTones, 1);
			// Update hair and fix different quantity for male and female hairs
			if (service.character.gender === 'Male') {
				if (!maleHead) {
					service.character.head = 1;
				}
				if (!maleShirt) {
					service.character.shirt = 1;
				}
				if (!pants) {
					service.character.pants = 1;
				}
				service.preview.head = maleHead;
				service.preview.shirt = maleShirt;
				service.preview.pants = pants;
			} else {
				if (!femaleHead) {
					service.character.head = 1;
				}
				if (!femaleShirt) {
					service.character.shirt = 1;
				}
				if (!skirt) {
					service.character.skirt = 1;
				}
				service.preview.head = femaleHead;
				service.preview.shirt = femaleShirt;
				service.preview.skirt = skirt;
			}
		}

		function getCharacter() {
			var url = API_PATH + 'character',
				defer = $q.defer();
			$http.get(url)
				.success(function (data) {
					service.character = data.characterInfo;
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

		function editCharacter(data) {
			var url = API_PATH + 'character/edit-character',
				defer = $q.defer();
			$http.put(url, data)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					var errorMsg = 'Error';

					switch (errCode) {
					case 400:
						errorMsg = 'Invalid data. Try again.';
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

		function getById(data, id) {
			return _.find(data, {
				'id': parseInt(id, 10)
			});
		}
	}
})();
