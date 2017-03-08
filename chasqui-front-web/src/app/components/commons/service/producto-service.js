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
	        
	        restProxy.get(CTE_REST.productosDestacadosByVendedor(CTE_REST.StateCommons.vendedor().id), {},         
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }

		vm.getProductosSinFiltro = function (params) {
			$log.debug(" service getProductosSinFiltro ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.postPublic(CTE_REST.productosSinFiltro(StateCommons.vendedor().id), params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		vm.getProductosByCategoria = function (params) {
			$log.debug(" service getProductosSinFiltro ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.postPublic(CTE_REST.productosByCategoria, params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
				
		vm.getProductosByProductor = function (params) {
			$log.debug(" service getProductosSinFiltro ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.postPublic(CTE_REST.productosByProductor, params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		vm.getProductosByMedalla = function (params) {
			$log.debug(" service getProductosSinFiltro ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.postPublic(CTE_REST.productosByMedalla, params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		vm.getProductosByQuery = function (params) {
			$log.debug(" service getProductosSinFiltro ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.postPublic(CTE_REST.productosByQuery, params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		vm.agregarPedidoIndividual = function (params) {
			$log.debug(" service agregarPedidoIndividual ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.put(CTE_REST.agregarPedidoIndividual, params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		vm.crearPedidoIndividual = function (params) {
			$log.debug(" service crearPedidoIndividual ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.post(CTE_REST.crearPedidoIndividual, params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		vm.verPedidoIndividual = function (params) {
			$log.debug(" service verPedidoIndividual ");
			
	        return doGetPrivate(CTE_REST.verPedidoIndividual(StateCommons.vendedor().id), {});
	    }
		
		vm.quitarProductoIndividual = function (params) {
			$log.debug(" service quitarProductoIndividual ");
			
	        return doPut(CTE_REST.quitarProductoIndividual, params);
	    }
		/*
		vm.verPedidoIndividual = function (params) {
			$log.debug(" service verPedidoIndividual ");
			
	        return doGetPrivate(CTE_REST.verPedidoIndividual(StateCommons.vendedor().id), {});
	    }
		*/
	//	restProxy.put(CTE_REST.quitarProductoIndividual, params, doOk, doNoOk);
		//////////////////////////////////////
		///////////// PRIVADOS
		
		function doGet(url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.get(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		 function doGetPrivate(url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.getPrivate(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		 function doPost(url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.post(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		 function doPostPublic(url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.postPublic(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		 function doPut(url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.put(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		 
		 function doDelete(url,params) {		
		        var defered = $q.defer();
		        var promise = defered.promise;
		        
		        restProxy.delete(url,params,      
		        		function doOk(response) {defered.resolve(response);},
						function doNoOk(response) {defered.reject(response);}
		        );
			 	 
		        return promise;
		    }
		
	 	/////////////////////////////////////
		//////////// M O C K S 
		
		vm.productosPedidoByUser = function (params) {
			$log.debug(" service agregarPedidoIndividual ");

	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.get(CTE_REST.productosPedidoByUser(StateCommons.vendedor().id), {},      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
	 
			
	}// function
})();// anonimo