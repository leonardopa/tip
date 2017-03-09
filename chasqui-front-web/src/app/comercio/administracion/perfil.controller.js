(function() {
	'use strict';

	angular.module('chasqui').controller('PerfilController', PerfilController);

	/** @ngInject . Pantalla de perfil de usuario */
	function PerfilController($log, $scope,
			StateCommons, $mdDialog, ToastCommons, $stateParams,perfilService) {
		$log.debug("Init PerfilController ....");

		StateCommons.ls.itemMenuSelect = 'perfil';
		var vm = this;

		vm.direcciones;
		vm.pass1 = "";
		vm.pass2 = "";

		vm.notificaciones = [];
		vm.notificacionesNoLeidas = [];
		vm.count = 1;

		vm.selectedIndexPerfil = 0;
		if ($stateParams.index != null) {
			$log.debug('Viene de notificaciones', $stateParams.index);
			vm.selectedIndexPerfil = $stateParams.index;
		}

		$scope.$on("load-direcciones", function(args, mass) {
			vm.callDirecciones();
		});

		vm.addDireccion = function() {
			$log.debug("add direccion");
			// vm.direcciones.push({alias: 'nueva'});
			vm.direcciones.push({});
			vm.selectedIndexDireccion = vm.direcciones.length;
		}

		vm.callDirecciones = function() {
			$log.debug('call direcciones ');
			// TODO NO OK , que vuelva a donde vino
			function doOk(response) {
				$log.debug('call direcciones response ', response);
				vm.direcciones = response.data;
			}
			
			perfilService.verDirecciones().then(doOk);			

		}

		var showPrerenderedDialog = function(ev) {
			$mdDialog.show({
				controller : PerfilController,
				contentElement : '#changePassDialogId',
				parent : angular.element(document.body),
				targetEvent : ev,
				clickOutsideToClose : true
			});
		};

		vm.cambiarPassConfirmar = function() {
			$log.debug('call direcciones response ', vm.pass1);
			if (vm.pass1 != '' && (vm.pass1 === vm.pass2)) {
				callCambiarPass();
				$mdDialog.cancel();
			} else {
				ToastCommons.mensaje("Las contraseñas deben ser iguales !");
			}
		}

		vm.cambiarPass = function() {
			$log.debug('cambiar pass', StateCommons.ls.usuario);
			showPrerenderedDialog();
		}

		var callCambiarPass = function() {
			function doOk(response) {
				ToastCommons.mensaje('Contraseña actualizada');
			}

			function doNoOk(response) {
				ToastCommons.mensaje(response.data);
			}
		
			perfilService.cambiarPass( vm.pass1).then(doOk);
		}

		vm.marcarLeido = function(notificacion) {
			function doOk(response) {
				ToastCommons.mensaje('Leido');
				notificacion.estado = 'Leido';
			}
			perfilService.marcarComoLeido(notificacion.id).then(doOk);
			
		}

		function callNotificacionesNoLeidas() {

			function doOk(response) {
				$log.debug('callObtenerNotificaciones', response);
				vm.notificacionesNoLeidas = response.data;
			}
			perfilService.notificacionesNoLeidas().then(doOk);						
		}

		function callNotificaciones() {

			function doOk(response) {
				$log.debug('callObtenerNotificaciones', response);
				vm.notificaciones = vm.notificaciones.concat(response.data);
				;
			}
			perfilService.notificacionesLeidas(vm.count).then(doOk);		
			
		}

		vm.verMas = function() {
			vm.count++;
			$log.debug('ver mas', vm.count);
			callNotificaciones();
		}

		vm.callDirecciones();
		callNotificacionesNoLeidas();
		callNotificaciones();

	}

})();
