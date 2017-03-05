(function() {
	'use strict';

	angular.module('chasqui').service('productorService', productorService);
	function productorService(restProxy, $q,$log,CTE_REST,StateCommons ) {
		var vm = this;
		
		vm.getProductores = function () {
			$log.debug(" service getProductores ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.get(CTE_REST.productores(StateCommons.vendedor().id),{},
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
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
		
	}// function
})();// anonimo