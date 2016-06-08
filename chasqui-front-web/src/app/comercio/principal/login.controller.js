(function() {
	'use strict';

	angular.module('chasqui').controller('LogInController', LogInController);

	/** @ngInject */
	function LogInController($scope, $http, $log, CTE_REST, restProxy) {
		$log.log('controler log in ..... ');

		var vm = this
		vm.user = {};

		vm.login = function() {
			$log.log('Log In ', vm.user);
			// TODO NO OK
			function doOk(response) {
				vm.variantes = response.data;
			}

			restProxy.post(CTE_REST.login, vm.user, doOk);

		}
	}
})();
