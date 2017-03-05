(function() {
	'use strict';

	angular.module('chasqui').service('productoService', productoService);
	function productoService(restProxy, $q,$log,CTE_REST,StateCommons ) {
		var vm = this;
	
		vm.getCategorias = function () {
			$log.debug(" service getCategorias ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.get(CTE_REST.categorias(StateCommons.vendedor().id),{},
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		vm.getMedallas = function () {
			$log.debug(" service getMedallas ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.get(CTE_REST.medallasProducto,{},	        
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		vm.getProductosDestacados = function () {
			$log.debug(" service getProductosDestacados ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.get(CTE_REST.productosDestacadosByVendedor(CTE_REST.idVendedor), {},         
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		
	}// function
})();// anonimo