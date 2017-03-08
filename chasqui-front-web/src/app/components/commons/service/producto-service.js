(function() {
	'use strict';

	angular.module('chasqui').service('productoService', productoService);
	function productoService(restProxy, $q,$log,CTE_REST,StateCommons,promiseService ) {
		var vm = this;		
		
		vm.getCategorias = function () {
			$log.debug(" service getCategorias ");	        
	        return promiseService.doGet(CTE_REST.categorias(StateCommons.vendedor().id),{});
	    }
		
		vm.getMedallas = function () {
			$log.debug(" service getMedallas ");
	        return promiseService.doGet(CTE_REST.medallasProducto,{});
	    }
		
		vm.getProductosDestacados = function () {
			$log.debug(" service getProductosDestacados ");
	        return promiseService.doGet(CTE_REST.productosDestacadosByVendedor(StateCommons.vendedor().id), {});
	    }

		vm.getProductosSinFiltro = function (params) {
			$log.debug(" service getProductosSinFiltro ");
	        return  promiseService.doPostPublic(CTE_REST.productosSinFiltro(StateCommons.vendedor().id), params);
	    }
		
		vm.getProductosByCategoria = function (params) {
			$log.debug(" service getProductosSinFiltro ");
	        return  promiseService.doPostPublic(CTE_REST.productosByCategoria, params);
	    }
				
		vm.getProductosByProductor = function (params) {
			$log.debug(" service getProductosSinFiltro ");
			return  promiseService.doPostPublic(CTE_REST.productosByProductor, params);
	    }
		
		vm.getProductosByMedalla = function (params) {
			$log.debug(" service getProductosSinFiltro ");
	        return promiseService.doPostPublic(CTE_REST.productosByMedalla, params);		 	 	       
	    }
		
		vm.getProductosByQuery = function (params) {
			$log.debug(" service getProductosSinFiltro ");       
	        return promiseService.doPostPublic(CTE_REST.productosByQuery, params);
	    }
		
		vm.agregarPedidoIndividual = function (params) {
			$log.debug(" service agregarPedidoIndividual ");
	        return promiseService.doPut(CTE_REST.agregarPedidoIndividual, params);
	    }
		
		vm.crearPedidoIndividual = function (params) {
			$log.debug(" service crearPedidoIndividual ");
	        return promiseService.doPost(CTE_REST.crearPedidoIndividual, params);
	    }
		
		vm.verPedidoIndividual = function (params) {
			$log.debug(" service verPedidoIndividual ");			
	        return promiseService.doGetPrivate(CTE_REST.verPedidoIndividual(StateCommons.vendedor().id), {});
	    }
		
		vm.quitarProductoIndividual = function (params) {
			$log.debug(" service quitarProductoIndividual ");			
	        return promiseService.doPut(CTE_REST.quitarProductoIndividual, params);
	    }
	 
		vm.cancelarPedidoIndividual = function (id) {
			$log.debug(" service cancelarPedidoIndividual ");			
	        return promiseService.doDelete(CTE_REST.cancelarPedidoIndividual(id), {});
	    }
		
		vm.verDirecciones = function (params) {
			$log.debug(" service verDirecciones ");			
	        return promiseService.doGetPrivate(CTE_REST.verDirecciones, {});
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