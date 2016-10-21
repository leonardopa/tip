(function() {
	'use strict';

	angular.module('chasqui').controller('FormDireccionController',
			FormDireccionController);

	/** @ngInject 
	 *  Formulario para direccion */
	function FormDireccionController( $log,$state,$scope,restProxy, CTE_REST,ToastCommons) {
		
		$log.debug("FormDireccionController",$scope.direccionParam);
		
		var vm = this;
		var isNew = $scope.direccionParam !=undefined && $scope.direccionParam.alias =='nueva';
		vm.domicilio =  $scope.direccionParam;
		vm.isEdit=false;
		
		//TODO: hacerlo flexible para grupo usuario vendedor ETC
		// ahora esta para grupo
		vm.guardar = function (){
			
			if (isNew){
				callNuevaDireccion();				
			}else{
				callUpdateDireccion();
			//	ToastCommons.mensaje('TODO : UPDATE cuando se tenga el id de direccion');
			}
			
			
		}
		
		vm.marcarPredeterminado = function(){
			ToastCommons.mensaje('TODO : marcar como predeterminado cuando se tenga el id de direccion');
			$log.debug("TODO : marcar como predeterminado cuando se tenga el id de direccion");
		}
		
		vm.eliminar = function(){
			ToastCommons.mensaje('TODO : eliminar cuando se tenga el id de direccion');
			$log.debug("TODO : eliminar cuando se tenga el id de direccion");
		}
		
		//////////////////////
		
		var callNuevaDireccion = function (){
			$log.debug("guardar domicilio",vm.domicilio);
			
	        function doOk(response) {	    			    		 
	    		$log.debug("respuesta guardar domicilio ", response);

	    		ToastCommons.mensaje('Se agrego dirección !');
	    		
	    		//TODO: en realidad la navegacion depende de donde vino 
	    		$state.go("perfil");
			};
			vm.domicilio.predeterminada =false;
			restProxy.post(CTE_REST.nuevaDireccion,vm.domicilio,doOk);
		}
		
		var callUpdateDireccion = function (){
			$log.debug("update domicilio",vm.domicilio);
			
	        function doOk(response) {	    			    		 
	    		$log.debug("respuesta update domicilio ", response);

	    		ToastCommons.mensaje('Se Actualizo dirección !');
	    		
	    		//TODO: en realidad la navegacion depende de donde vino 
	    		$state.go("perfil");
			};
			vm.domicilio.predeterminada =false;
			restProxy.put(CTE_REST.actualizarDireccion,vm.domicilio,doOk);
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
