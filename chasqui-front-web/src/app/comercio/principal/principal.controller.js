(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('PrincipalController',PrincipalController);

  /** @ngInject */
  function PrincipalController( $scope,$log,restProxy, CTE_REST, $timeout,StateCommons) {
	  $log.debug("PrincipalController ..... ",StateCommons.ls.pedidoSeleccionado);
	  StateCommons.ls.itemMenuSelect = 'principal'; 
	  var vm = this;

	  vm.hello = "PrincipalController ...  hello";
	 
	  vm.categorias=[];

	  
	  function callCategorias() {
			$log.debug("---callCategorias ---");

			function doOk(response) {
				 
				vm.categorias = response.data;
				vm.categoriaSelect =vm.categorias[0]; 
			}
			
			restProxy.get(CTE_REST.categorias(StateCommons.vendedor().id),{},doOk);
	 }
	  
	  callCategorias()
	    
  }
})();
