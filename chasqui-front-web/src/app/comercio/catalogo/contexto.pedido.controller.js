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
				console.log((grupo)) 		
				console.log(getPedidoByGrupo(grupo)) ;
				vm.pedidoSelected = getPedidoByGrupo(grupo);
				StateCommons.ls.pedidoSelected=vm.pedidoSelected;
				console.log(vm.pedidoSelected);
				console.log(StateCommons.ls.pedidoSelected);
			});

		//actualiza la lista de productos
		$rootScope.$on('lista-producto-agrego-producto', 
			function(event) {			
				callPedidoIndividual();			
				callGccPedidos();
			});
		

		function getPedidoByGrupo(grupo){		
			// es algun gcc
			var pedidoCurrent=undefined;// o no tiene pedido

			angular.forEach(vm.pedidos, function(pedido, key) {
			  if (pedido.id ===  grupo.idPedidoIndividual) 
			  	pedidoCurrent=pedido;
			});
			// si es indivudual
			if(grupo.alias=='Personal'){				
				angular.forEach(vm.pedidos, function(pedido, key) {								
			  		if (utilsService.isUndefinedOrNull(pedido.idGrupo))
			  			pedidoCurrent = pedido;
				});	
			}			
			
			return pedidoCurrent;
			
		}

		////////////////////
		///////// llamada a servicios

		function callGccPedidos(){			
			function doOkPedido(response){	
				vm.pedidos=vm.pedidos.concat(response.data);				
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