(function() {
	'use strict';

	angular.module('chasqui').controller('FormDireccionController',
			FormDireccionController);

	/** @ngInject 
	 *  Formulario para direccion */
	function FormDireccionController($http, $log, $scope,$mdDialog, $mdMedia,$state,restProxy, CTE_REST) {
		$log.debug("controler FormDireccionController");
		var vm = this;
		
		vm.domicilio;
		
		//TODO: hacerlo flexible para grupo usuario vendedor ETC
		// ahora esta para grupo
		vm.guardar = function (){
			$log.debug("guardar domicilio",vm.domicilio);
			
			// TODO : SACAR USUARIO HARCODEADO
//			$http.post("http://localhost:8081/chasqui-mock/direccion/usuario/"+"1/",vm.domicilio)
//	        .then(doOk);
			
	        function doOk(response) {	    			    		 
	    		$log.debug("respuesta guardar domicilio ", response);

	    		//TODO: en realidad la navegacion depende de donde vino 
	    		$state.go("lista-grupos");
			};
			
			restProxy.post(CTE_REST.direccionGrupo(1),vm.domicilio,doOk);
			
		}
	}
	
})();
