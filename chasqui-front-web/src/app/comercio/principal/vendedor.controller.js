(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('VendedorController',VendedorController);


/** @ngInject */
  function VendedorController( $scope,$log,restProxy, CTE_REST, $timeout, StateCommons) {
	  $log.debug("VendedorController ..... ");
	  
	  var vm = this;

	  
	  vm.vendedor;
	  vm.imagen;
          vm.urlBase = CTE_REST.url_base;




    function callVendedorImagen() {
			

			function doOk(response) {
				 
				vm.vendedor = response.data;
				vm.imagen = vm.vendedor.imagen; 
			}
			
			
			restProxy.get(CTE_REST.vendedor,{},doOk);		    
	 }

    callVendedorImagen()
	    
  }
})();





