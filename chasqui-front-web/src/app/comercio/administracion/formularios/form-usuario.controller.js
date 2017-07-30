(function() {
	'use strict';

	angular.module('chasqui').controller('FormUsuarioController',
		FormUsuarioController);

	/**
	 * @ngInject Formulario para crear un grupo
	 */
	function FormUsuarioController($log, $state,
		ToastCommons, StateCommons, $scope, $timeout, perfilService,
		utilsService) {
		$log.debug("controler FormUsuarioController", $scope.perfil);

		var vm = this;

		vm.user = {};
		vm.passVerificacion;

		vm.isAlta = $scope.perfil != true; // si crea un usuario nuevo o es un
		// update. Si viene de perfil es
		// UPDATE
		vm.readOnly = !vm.isAlta; // si es alta siempre false, sino depende el
		// modo.
		vm.isModoEdit = false;

		function mostrarMensajesDeBienvenida() {

			$timeout(function() {
				ToastCommons.mensaje(utilsService.tratranslate('BIENVENIDO'));
			}, 3000);

			$timeout(function() {
				ToastCommons.mensaje(utilsService.tratranslate('INGRESA_MSG'));
			}, 10000);

			$timeout(function() {
				ToastCommons.mensaje(utilsService.tratranslate('CORREO_MSG'));
			}, 15000);

			$timeout(function() {
				ToastCommons.mensaje(utilsService.tratranslate('COMPL_PERFIL_MSG'));
			}, 30000);
		}

		vm.init = function() {
			if (!vm.isAlta) {
				vm.callVerUsuario();
			}
		}

		vm.guardar = function() {
			vm.callGuardar();
		}

		vm.actualizar = function() {
			$log.debug("Actualizar usuario", vm.user);

			vm.callActualizarUsuario();

			vm.readOnly = true;
			vm.isModoEdit = false;
		}

		vm.edit = function() {
			$log.debug("click edit usuarrio");
			vm.readOnly = false;
			vm.isModoEdit = true;
		}

		vm.noActualizar = function() {
			$log.debug("click NO edit usuarrio");
			vm.readOnly = true;
			vm.isModoEdit = false;

			vm.callVerUsuario();
		}
		// ///////// llamadas

		vm.callVerUsuario = function() {

			function doOk(response) {
				$log.debug("callVerUsuario", response);
				vm.user = response.data;
			}
			perfilService.verUsuario().then(doOk);

		}

		vm.callActualizarUsuario = function() {

			function doOk(response) {
				ToastCommons.mensaje(utilsService.tratranslate('ACTUALIZO_PERFIL_MSG'));
			}
			delete vm.user['direccion'];
			delete vm.user['email'];
		
			// TODO : manejar error
			// ToastCommons.mensaje('Falla actulizar. Ver Trello');

			perfilService.editUsuario(vm.user).then(doOk)
		}

		// usuaruo nuevo
		vm.callGuardar = function() {
			$log.debug("guardar usuario", vm.user);

			if (vm.user.password == vm.passVerificacion) {

				function doOk(response) {
					$log.debug("guardo usuario", response.data);

					mostrarMensajesDeBienvenida();

					StateCommons.ls.token = response.data.token;

					// $state.go("registro",{ "isPasoDomicilio" : true});
					// $rootScope.$broadcast("creo-usuario-nuevo", { user:
					// response.data });
					$scope.$emit("creo-usuario-nuevo", {
						user: response.data
					});

				}

				perfilService.singUp(vm.user).then(doOk)

			} else {
				$log.error("las contrasenas no coinciden");
				// TODO: enviar mensaje
				ToastCommons.mensaje(utilsService.tratranslate('PASS_INCORRECTO_MSG'))
			}
		}

		vm.init();
	}

})();
