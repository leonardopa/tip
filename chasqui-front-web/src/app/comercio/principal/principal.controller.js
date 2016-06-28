(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('PrincipalController',PrincipalController);

  /** @ngInject */
  function PrincipalController( $scope,$log,restProxy, CTE_REST, $timeout,StateCommons) {
	  $log.debug("PrincipalController ..... ",StateCommons.ls.pedidoSeleccionado);
	  
	  var vm = this;

	  
	  vm.topDirections = ['left', 'up'];
	  vm.bottomDirections = ['down', 'right'];
	  vm.isOpen = false;
	  vm.availableModes = ['md-fling', 'md-scale'];
	  vm.selectedMode = 'md-fling'; ///md-scale
	  vm.availableDirections = ['up', 'down', 'left', 'right'];
	  vm.selectedDirection = 'up';
	  
	  
	  vm.pedidos={};
	  vm.carrito=StateCommons.ls.pedidoSeleccionado;
	  vm.size=24;
	  vm.icon='shopping_cart';
	  vm.options={'rotation': 'circ-in' , 'duration': 1000 };

	  
	  vm.cambiarContexto = function (pedido){
		  $log.debug("cambia contexo de carrito ",pedido);
		  
		  vm.carrito=pedido;
		  StateCommons.ls.pedidoSeleccionado = vm.carrito;
		  
		  vm.icon=pedido.icon;
			//  vm.icon='shopping_cart';			  
			  $timeout(function() {
				  vm.icon='shopping_cart';
				  ///vm.icon=pedido.icon;
			  }, 1500);

	  }
	  /// CALL REST 
	  
	  //TODO: cache , para no sobrecargar con grupos
	  function callLoadGrupos() {
			$log.debug("--- find  pedidos abiertos ---");

			function doOk(response) {
				 
				vm.pedidos = response.data;
				

				angular.forEach(vm.pedidos, function(pedido) {
					$log.debug(pedido.tipo );
					pedido.icon = 'people';
					pedido.icon = pedido.tipo == 'INDIVIDUAL' ? 'person' : pedido.icon ;
					pedido.icon = pedido.tipo == 'NODOS' ? 'people_outline' : pedido.icon ;
					
				});

				if (vm.carrito !=null){
					//vm.carrito = vm.pedidos[0];
					vm.carrito = StateCommons.ls.pedidoSeleccionado;					
				}else{
					vm.carrito = vm.pedidos[0];
				}
			}
			
			// TODO: hacer el ID de usuario dinamico
			restProxy.get(CTE_REST.productosPedidoByUser(6),{},doOk);		    
	 }
	 
	  
	 callLoadGrupos();
  }
})();
