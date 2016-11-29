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
				$log.debug(response.data); 
				vm.vendedor = response.data;
				vm.imagen = vm.vendedor.imagen; 
				$log.debug(vm.imagen); 
			}
			
			function notOk(response) {
				$log.debug("No se encuentra vendedor con nombre: "+CTE_REST.vendedor); 
				vm.vendedor=response;
				vm.vendedor.id=CTE_REST.idVendedor;
				vm.vendedor.nombre="No se encuentra vendedor con ese nombre";
				vm.vendedor.imagen=CTE_REST.defaultLogo;
			}
			
			
			restProxy.get(CTE_REST.vendedor,{},doOk,notOk);		    
	 }

    callVendedorImagen()
	    
  }
})();





