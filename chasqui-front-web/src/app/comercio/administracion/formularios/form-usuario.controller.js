(function() {
	'use strict';

	angular.module('chasqui').controller('FormUsuarioController',
			FormUsuarioController);

	/** @ngInject
	 * Formulario para crear un grupo */
	function FormUsuarioController($log,$state,restProxy, CTE_REST) {
		$log.debug("controler FormUsuarioController" ,  $state.params.domicilio );
		
				 
		var vm = this;

		vm.user = {} ;
		
		if ( $state.params.domicilio != undefined ){
			vm.user.direccion = $state.params.domicilio; 
		}
 
		vm.guardar = function() {
			$log.debug("guardar usuario", vm.user);

 
			function doOk(response) {
				$log.debug("guardo usuario", response.data);
				
				$state.go("principal");
			};
			// TODO : SACAR USUARIO HARCODEADO
			restProxy.post(CTE_REST.singUp, vm.user ,doOk);
 
		}
	}

})();