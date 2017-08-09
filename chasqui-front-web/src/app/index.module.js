(function() {
	'use strict';

	angular.module('chasqui', ['ngAnimate', 'ngCookies', 'ngTouch',
			'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router',
			'toastr', 'ngMaterial', 'ngStorage', 'ngMdIcons', 'pascalprecht.translate', 'leaflet-directive', 'angular-loading-bar'
		])
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('forest')
				.primaryPalette('orange');
		})

})();
