(function() {
	'use strict';

	angular.module('chasqui').controller('FormGrupoController',
			FormGrupoController);

	/**
	 * @ngInject Formulario para crear un grupo
	 */
	function FormGrupoController($log, $state, gccService) {
		$log.debug("controler FormGrupoController");
		var vm = this;

		vm.grupo;
		// la direccion del grupo es la misma que la del usuairio que lo
		// administra
		vm.isDireccionUsuario = true;

		vm.guardar = function() {
			$log.debug("guardar grupo", vm.grupo);

			function doOk(response) {
				$log.debug("respuesta guardar grupo ", response);

				// TODO: guardar el id del grupo creado

				if (vm.isDireccionUsuario) {
					$state.go("lista-grupos");
				} else {
					$state.go("form-domicilio");
				}

			}
		 
			gccService.nuevoGrupo(vm.grupo).then(doOk)
		}
	}

})();