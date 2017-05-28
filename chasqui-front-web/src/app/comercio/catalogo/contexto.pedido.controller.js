(function() {
	'use strict';

	angular
		.module('chasqui')
		.controller('ContextoPedidoController', ContextoPedidoController);

	/**
	 * Pagina donde se muestran los productos. Contiene los filtros y el
	 * contexto de compra , pero NO la lista de productos la cual se incluye
	 */
	function ContextoPedidoController($log,CTE_REST,StateCommons,gccService,utilsService
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
			}

			productoService.verPedidoIndividual().then(doOkPedido);
		}
	
		if (vm.isLogued){
			callPedidoIndividual();			
			callGccPedidos();
		}
		

	}
})();