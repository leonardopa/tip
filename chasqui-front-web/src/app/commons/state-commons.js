(function() {
	'use strict';

	angular.module('chasqui').service('DialogCommons', DialogCommons);
	function DialogCommons($mdToast) {
		var vm = this;

		vm.mensaje = function(mensaje) {

			$mdToast.show($mdToast.simple().textContent(mensaje)
					.hideDelay(3000));
		}

	}// function
})();// anonimo
