(function() {
	'use strict';

	angular.module('chasqui').controller('FormDireccionController',
			FormDireccionController);

	/** @ngInject 
	 *  Formulario para direccion */
	function FormDireccionController( $log,$state,restProxy, CTE_REST,ToastCommons) {
		
		var vm = this;
		
		vm.domicilio =  {}
	 
		
		//TODO: hacerlo flexible para grupo usuario vendedor ETC
		// ahora esta para grupo
		vm.guardar = function (){
			callNuevaDireccion();
		}
		
		 
		
		//////////////////////
		
		var callNuevaDireccion = function (){
			$log.debug("guardar domicilio",vm.domicilio);
			
	        function doOk(response) {	    			    		 
	    		$log.debug("respuesta guardar domicilio ", response);

	    		ToastCommons.mensaje('Se actualizo con exito');
	    		
	    		//TODO: en realidad la navegacion depende de donde vino 
	    		$state.go("principal");
			};
			
			restProxy.post(CTE_REST.nuevaDireccion,vm.domicilio,doOk);
		}
		
		
		
		/////// TODO: ver cuando este para asociar a una grupo
		var guardarDireccionGrupo = function (){
			$log.debug("guardar domicilio al grupo",vm.domicilio);
			
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
