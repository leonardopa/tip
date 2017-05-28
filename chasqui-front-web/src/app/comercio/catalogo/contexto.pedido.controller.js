(function() {
	'use strict';

	angular
		.module('chasqui')
		.controller('ContextoPedidoController', ContextoPedidoController);

	/**
	 *  FAB Button de contexto de compra.
	 */
	function ContextoPedidoController($rootScope,$log,CTE_REST,StateCommons,gccService,utilsService
		,productoService,$timeout) {	

		$log.debug("ContextoPedidoController ..... ", StateCommons.ls.grupoSelected);
		var vm = this;
		 
		/////////////////////////////////////////////////

		// Representa el conepto de grupo indivial para el caso de que no tiene un pedido abierto
		vm.urlBase = CTE_REST.url_base;
		vm.isLogued=StateCommons.isLogued();
	
		vm.pedidos= [];
		vm.pedidoSelected;

		vm.checkAlias=function(){
			if (vm.pedidoSelected)
				return vm.pedidoSelected.aliasGrupo == null ? 'Personal' : vm.pedidoSelected.aliasGrupo;
		}

		$rootScope.$on('contexto.compra.cambia.grupo', 
			function(event, grupo) { 
				vm.pedidoSelected = getPedidoByGrupo(grupo);
			});

		function getPedidoByGrupo(grupo){		
			// es algun gcc
			angular.forEach(vm.pedidos, function(pedido, key) {
			  if (pedido.idPedidoIndividual ===  grupo.idPedidoIndividual) return pedido;
			});
			// si es indivudual
			angular.forEach(vm.pedidos, function(pedido, key) {
			  if (pedido.idGrupo ===  null) return pedido;
			});
			// o no tiene pedido
		}

		////////////////////
		///////// llamada a servicios

		function callGccPedidos(){			
			function doOkPedido(response){	
				vm.pedidos.concat(response.data);				
			}

			gccService.pedidosByUser().then(doOkPedido);
		}

		function callPedidoIndividual(){			
			function doOkPedido(response){					
				vm.pedidos.push(response.data);	
				vm.pedidoSelected=response.data;	

				StateCommons.ls.pedidoSelected=vm.pedidoSelected;
				/// falta logica para pedidos grupales y si selecciono desde otra pantalla			
			}

			productoService.verPedidoIndividual().then(doOkPedido);
		}
	
		if (vm.isLogued){
			callPedidoIndividual();			
			callGccPedidos();
		}
		

	}
})();