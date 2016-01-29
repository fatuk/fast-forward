var appConfig = {

	init: function () {
		'use strict';

		var loc_host = document.location.hostname;
		if (loc_host.indexOf(':') > 0) {
			loc_host = loc_host.substr(0, loc_host.indexOf(':'));
		}

		var loc_port = document.location.port;
		var currentVersion = 'v1';
		var serviceDomain = loc_host;
		var servicePort = loc_port;
		var serviceProtocol = 'http:';
		var gameUrl = '';

		switch (loc_host) {
		case 'localhost':
			serviceDomain = 'localhost';
			servicePort = 34471;
			gameUrl = 'http://site.weezlabs.com:8101/game/';
			break;
		case 'admin.lighthouse.com':
			serviceDomain = 'api.lighthouse.com';
			servicePort = 443;
			serviceProtocol = 'https:';
			gameUrl = 'lighthouse.com';
			break;
		case 'site.weezlabs.com':
			serviceDomain = 'site.weezlabs.com';
			servicePort = 8101;
			serviceProtocol = 'http:';
			gameUrl = 'http://site.weezlabs.com:8101/game/';
			break;
		}

		this.apiUrl = serviceProtocol + '//' + serviceDomain + (servicePort ? (':' + servicePort) : '') + '/api/' + currentVersion + '/';
		this.staticFiles = serviceProtocol + '//' + serviceDomain + (servicePort ? (':' + servicePort) : '');
		this.defaultCompanyLogo = '/Upload/CompanyPictures/default_logo.png';
		this.applicationName = 'Admin panel';
		this.gameUrl = gameUrl;
	}
};

appConfig.init();
