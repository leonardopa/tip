(function() {
	'use strict';

	angular.module('chasqui').controller('FormGrupoController',
			FormGrupoController);

	/** @ngInject
	 * Formulario para crear un grupo */
	function FormGrupoController($http, $log, $scope, $mdDialog, $mdMedia,$state,restProxy, CTE_REST) {
		$log.debug("controler FormGrupoController");
		var vm = this;

		vm.grupo;
		// la direccion del grupo es la misma que la del usuairio que lo administra
		vm.isDireccionUsuario = true;

		vm.guardar = function() {
			$log.debug("guardar grupo", vm.grupo);

			// TODO : SACAR USUARIO HARCODEADO
//			$http.post(
//					"http://localhost:8081/chasqui-mock/usuarios/" + 1
//							+ "/grupos/", vm.grupo).then(doOk);

			function doOk(response) {
				$log.debug("respuesta guardar grupo ", response);
				
				// TODO: guardar el id del grupo creado
				
				if (vm.isDireccionUsuario){
					$state.go("lista-grupos");
				}else{
					$state.go("form-domicilio");
				}
				
			};
			// TODO : SACAR USUARIO HARCODEADO
			restProxy.post(CTE_REST.gruposByusuario(1), vm.grupo ,doOk);

		}
	}

})();