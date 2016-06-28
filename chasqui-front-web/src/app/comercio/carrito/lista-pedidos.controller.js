(function() {
	'use strict';

	angular.module('chasqui').controller('ListaPedidosController',
			ListaPedidosController);

	/** @ngInject */
	function ListaPedidosController($log,$state,$scope,restProxy, CTE_REST,StateCommons) {
		$log.debug('ListaPedidosController ..... ', StateCommons.ls.pedidoSeleccionado);
		
		var vm = this;
		vm.habilita = false;
		 
		vm.tabs = [];
		vm.selected = null, vm.previous = null;
		vm.selectedIndex = 1;

		vm.pedidoDelContexto = StateCommons.ls.pedidoSeleccionado ; 
		
		$scope.$watch('listaPedidoCtrl.selectedIndex', function(current, old) {
			
			vm.previous = vm.selected;
			vm.selected = vm.tabs[current];
			
			$log.debug('cambio tab ..... ', vm.selected);
			
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
		
		var callLoadPedidos  = function () {
			$log.debug("--- find pedidos --------");

			function doOk(response) {
				$log.debug("--- find pedidos resultado --------",response.data);
				vm.tabs = response.data;
				 
				var i = 0
				var indexSelect=0;
				
				// me fijo en que tab estaba la ultima vez que vino , o si vino de la 
				// pantalla principal
				angular.forEach(vm.tabs, function(tab) {
				 
					$log.debug(tab.id + " " + tab.nombre );
				// 	$log.debug(tab.id + "   " + vm.pedidoDelContexto.id);
				 
					if ((vm.pedidoDelContexto != undefined) && (tab.id == vm.pedidoDelContexto.id) ) {
						$log.debug("****** " +  tab.id);
						indexSelect = i ; 
					}
					
					i++;
				});
			
				vm.selected = vm.tabs[indexSelect];
				vm.selectedIndex = indexSelect;
			}

			// TODO: hacer el ID de usuario dinamico			
			restProxy.get(CTE_REST.productosPedidoByUser(6),{},doOk);
		}
		
		
		
		 callLoadPedidos()
		
	}

})();
