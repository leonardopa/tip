(function() {
	'use strict';

	angular.module('chasqui').controller('FormDireccionController',
		FormDireccionController);

	/**
	 * @ngInject Formulario para direccion
	 */
	function FormDireccionController($log, $state, $scope, ToastCommons, perfilService, us) {

		$log.debug("FormDireccionController", $scope.direccionParam);

		var vm = this;
		var isNew = angular.equals({}, $scope.direccionParam);
		vm.domicilio = $scope.direccionParam;
		vm.isEdit = false;

		function loadDirecciones() {
			$scope.$emit("load-direcciones", {}); // recarga las direcciones
			// que estan el el
			// conteoller de perfil
		}

		// TODO: hacerlo flexible para grupo usuario vendedor ETC
		// ahora esta para grupo
		vm.guardar = function() {
			$log.debug("Guardar Domicilio , nuevo? ", isNew);
			if (isNew) {
				callNuevaDireccion();
			} else {
				callUpdateDireccion();
				// ToastCommons.mensaje('TODO : UPDATE cuando se tenga el id de
				// direccion');
			}
		}

		vm.marcarPredeterminado = function() {
			$log.debug("marcar como predeterminado");

			function doOk(response) {
				$log.debug("respuesta marcar como predeterminado ", response);
				vm.domicilio.predeterminada = true;
				ToastCommons.mensaje(us.translate('PREDETERMINADO'));
			}

			vm.domicilioParam = vm.domicilio;
			vm.domicilioParam.predeterminada = true;
			perfilService.actualizarDireccion(vm.domicilioParam).then(doOk);

		}

		vm.eliminar = function() {
			$log.debug("eliminar direccion");

			function doOk(response) {
				$log.debug("respuesta eliminar direccion ", response);

				ToastCommons.mensaje(us.translate('ELIMINO_DIRECCION'));
				loadDirecciones();
			}

			perfilService.eliminarDireccion(vm.domicilio.idDireccion).then(doOk);
		}

		// ////////////////////

		var callNuevaDireccion = function() {
			$log.debug("guardar domicilio", vm.domicilio);

			function doOk(response) {
				$log.debug("respuesta guardar domicilio ", response);

				ToastCommons.mensaje(us.translate('AGREGO_DIRECCION'));

				loadDirecciones();
			}

			vm.domicilio.predeterminada = true; // TODO : si es el primero
			// deberia ser TRUE si no no

			perfilService.nuevaDireccion(vm.domicilio).then(doOk);
		}

		vm.me = us.translate('PREDETERMINADO');

		var callUpdateDireccion = function() {
			$log.debug("update domicilio", vm.domicilio);

			function doOk(response) {
				$log.debug("respuesta update domicilio ", response);

				ToastCommons.mensaje(us.translate('ACTUALIZO_DIRECCION'));

				loadDirecciones();

			}
			vm.domicilio.predeterminada = false;
			perfilService.actualizarDireccion(vm.domicilio).then(doOk);

		}


		// ///// TODO: ver cuando este para asociar a una grupo
		/*
		var guardarDireccionGrupo = function() {
			$log.debug("guardar domicilio al grupo", vm.domicilio);


			function doOk(response) {
				$log.debug("respuesta guardar domicilio ", response);

				// TODO: en realidad la navegacion depende de donde vino
				$state.go("lista-grupos");
			}

			perfilService.direccionGrupo(1, vm.domicilio).then(doOk);
		}*/
	}

})();
