(function() {
	'use strict';

	angular.module('chasqui').controller('LogInController', LogInController);

	/** @ngInject */
	function LogInController($log, CTE_REST, restProxy, $state, StateCommons,
			ToastCommons, $rootScope, dialogCommons) {

		$log.debug('controler log in ..... ');

		var vm = this
		vm.user = {};

		vm.nuevo = function() {
			$log.debug('Log In nuevo user');

			$state.go("registro");

		}
		vm.recuperar = function(ev) {
			dialogCommons.prompt('Recuperar contraseña',
					'Enviaremos instrucciones a tu correo',
					'correo@correo.com', 'Enviar', 'Cancelar',
					function(result) {
						vm.callReset(result)
					}, function() {
						$log.debug('Cancelo correo')
					});
		};

		// ///// REST

		vm.login = function() {
			$log.debug('Log In ', vm.user);
			// TODO NO OK , que vuelva a donde vino
			function doOk(response, headers) {
				$log.debug('response login ', response);

				StateCommons.ls.usuario = response.data;

				ToastCommons.mensaje("Bienvenido !");
				$rootScope.$broadcast('resetHeader', "");
				$state.go("principal");

			}

			function doNoOk(response, headers) {
				ToastCommons
						.mensaje("Fallo la autenticación, <br>verifique los datos");
			}

			restProxy.postPublic(CTE_REST.login, vm.user, doOk, doNoOk);

		}

		vm.callReset = function(email) {

			function doOk(response) {
				ToastCommons.mensaje("Revisa tu correo !");
			}

			function doNoOk(response) {
				$log.debug('response reset pass ', response);
				ToastCommons.mensaje("Error , el mail es correcto ?");
			}

			restProxy.get(CTE_REST.resetPass(email), {}, doOk, doNoOk);

		}

	}
})();
