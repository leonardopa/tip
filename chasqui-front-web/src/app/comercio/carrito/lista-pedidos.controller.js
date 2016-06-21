(function() {
	'use strict';

	angular.module('chasqui').controller('ListaPedidosController',
			ListaPedidosController);

	/** @ngInject */
	function ListaPedidosController($http, $log,$state,$scope,restProxy, CTE_REST,StateCommons) {
		$log.debug('ListaPedidosController ..... ');
		
		var vm = this;
		vm.habilita = false;
		 
		vm.tabs = [];
		vm.selected = null, vm.previous = null;
		vm.selectedIndex = 1;

		//
		$scope.$watch('selectedIndex', function(current, old) {
			vm.previous = vm.selected;
			vm.selected = vm.tabs[current];
			
			StateCommons.ls.pedidoSeleccionado = vm.selected;
			
			if (old + 1 && (old != current))
				if (!angular.isUndefined(vm.previous)) {
					$log.debug('Goodbye ' + vm.previous.nombre + '!');
				}
			if (current + 1)
				if (!angular.isUndefined(vm.selected)) {
					$log.debug('Hello ' + vm.selected.nombre + '!');
				}
		});
	

		
	
		///////////////// REST
		
		function callLoadPedidos() {
			$log.debug("--- find pedidos --------");

			function doOk(response) {
				
				vm.tabs = response.data;
				 

				vm.selected = vm.tabs[0];
			}

			// TODO: hacer el ID de usuario dinamico			
			restProxy.get(CTE_REST.productosPedidoByUser(6),{},doOk);
		}
		
		
		
		 callLoadPedidos()
		
	}

})();
