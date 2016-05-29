(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('ListaProductosController',ListaProductosController);

  /** @ngInject */
  function ListaProductosController($http,$log,restProxy,CTE_REST) {
	  $log.log('ListaProductosController ..... ');
	  var vm = this;
	 
	  vm.variantes=[];
	  
	  vm.pageChanged = function() {		 
	    $log.log('Page changed to: ' + vm.bigCurrentPage);
	    findProductos(vm.bigCurrentPage,5);
	  };
	  
	  var findProductos = function (pagina,items){
		  $log.log('findProductos: ' + pagina + " " + items);
	   
	        function doOk(response) {	    
	        	$log.log('findProductos Response ',response);
	    		vm.variantes = response.data.productos;;
	    		vm.maxSize = 10;
	    		vm.bigTotalItems = response.data.itemsTotal;
	    		vm.bigCurrentPage = response.data.paginaActual;
	    	}
	        	    	
	        restProxy.get(CTE_REST.productosPaginado(pagina,items),{},doOk);
	       	       
	  }
	  
	  findProductos(1,5);
	 
  }
})();
