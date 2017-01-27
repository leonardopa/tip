(function() {
	'use strict';

	angular.module('chasqui').controller('ListaPedidosController',
			ListaPedidosController);

	/** @ngInject */
	function ListaPedidosController($log,$state,$scope,restProxy, CTE_REST,StateCommons,ToastCommons) {
		$log.debug('ListaPedidosController ..... ', StateCommons.ls.pedidoSeleccionado);
		 StateCommons.ls.itemMenuSelect = 'lista-pedidos'; 
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
	

		vm.crearPedidoIndividual = function(){
			$log.debug("--- Crear pedido individual----");
			callCrearPedidoIndividual();
			
			//callLoadPedidos()
			callPedidoIndividual()
		}
	
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

			
	    	restProxy.get(CTE_REST.productosPedidoByUser(StateCommons.vendedor().id),{},doOk);

		}
		
		function callCrearPedidoIndividual(){
			function doNoOk(response) {
				$log.debug("--- callPedidoIndividual  response",response.data.error);
				
				ToastCommons.mensaje(response.data.error);
				 
			}
			
			function doOk(response) {
				$log.debug("--- crear pedido individual response ",response.data);
				 
				ToastCommons.mensaje("Pedido creado ! deberia fallar si ya tiene uno");
			}
			var json={};
			json.idVendedor=StateCommons.vendedor().id;
			restProxy.post(CTE_REST.crearPedidoIndividual,json,doOk,doNoOk);
		}
		
		function callPedidoIndividual(){
			function doOk(response) {
				//TODO: ver si lo puede traer el servicio
				response.data.creador = 'INDIVIDUAL'
				response.data.nombre = 'INDIVIDUAL'
				vm.tabs.push(response.data);
				
			}
			
			function doNoOk(response) {
				$log.debug("--- callPedidoIndividual ",response.data);
				
				if (response.status==404){
					ToastCommons.mensaje("Noy  hay pedidos !");
				}else{
					ToastCommons.mensaje("algo fallo !");
				}
			}
			
			restProxy.getPrivate(CTE_REST.verPedidoIndividual(StateCommons.vendedor().id),{},doOk,doNoOk);
		
		}
		
		//callLoadPedidos()
		callPedidoIndividual()
	}

})();
