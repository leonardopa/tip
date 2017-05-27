(function() {
	'use strict';

	angular
		.module('chasqui')
		.controller('ContextoCompraController', ContextoCompraController);

	/**
	 * Pagina donde se muestran los productos. Contiene los filtros y el
	 * contexto de compra , pero NO la lista de productos la cual se incluye
	 */
	function ContextoCompraController($log,CTE_REST,StateCommons,gccService,utilsService
		,$timeout) {	
		
		$log.debug("ContextoCompraController ..... ", StateCommons.ls.grupoSelected);
		var vm = this;
		vm.isLogued=StateCommons.isLogued();
	
		// ///////// Para el selector de Grupos de compra
		vm.topDirections = ['left', 'up'];
		vm.bottomDirections = ['down', 'right'];
		vm.isOpen = false;
		vm.availableModes = ['md-fling', 'md-scale'];
		vm.selectedMode = 'md-fling'; // /md-scale
		vm.availableDirections = ['up', 'down', 'left', 'right'];
		vm.selectedDirection = 'up';
		vm.size = 24;
		vm.icon = 'shopping_cart';
		vm.options = {
			'rotation': 'circ-in',
			'duration': 1000
		};
		/////////////////////////////////////////////////

		var gIndividual={}
		gIndividual.alias="Personal";
		gIndividual.esAdministrador=true;

		//vm.carrito = StateCommons.ls.pedidoSeleccionado;
		if(utilsService.isUndefinedOrNull(StateCommons.ls.grupoSelected)){
			vm.grupoSelected=gIndividual;	
		}else{
			vm.grupoSelected=StateCommons.ls.grupoSelected;
		}
		
		vm.grupos = {};
		
		vm.cambiarContexto = function(grupo) {
			$log.debug("cambia contexo de carrito ", grupo);

			vm.grupoSelected = grupo;			
			StateCommons.ls.grupoSelected = vm.carrito;

			vm.icon = 'person';
			// vm.icon='shopping_cart';
			$timeout(function() {
				vm.icon = 'shopping_cart';
				// /vm.icon=pedido.icon;
			}, 1500);

		}

		////////////////////
		///////// llamada a servicios

		function callGrupos(){
			$log.debug("--- call grupos ---");	

			function doOK(response){
				vm.grupos=[];
				vm.grupos.concat(response.data);		
				
				vm.grupos.push(gIndividual);
			}

			gccService.gruposByusuario().then(doOK);
		}

		// TODO: cache , para no sobrecargar con grupos
		// TODO: implemantar cuante este funcionando grupos
		// TODO : aca se trae los grupos y sus pedidos, pero deberia ser solo 
		// nombre del grupo y ID-Pedido 
		/*
		function callLoadGrupos() {
			$log.debug("--- find  pedidos abiertos ---");

			function doOk(response) {

				//vm.pedidos = response.data;
				vm.pedidos = [];
				var pedidosAux = response.data;


				angular.forEach(pedidosAux, function(pedido) {
					//$log.debug(pedido);
					if (pedido.estado == 'ABIERTO'){
						// Esto es hasta no tener umagenes que identifiquen a los grupos
						pedido.aliasGrupo = utilsService.isUndefinedOrNull(pedido.aliasGrupo) ? 'Personal' : pedido.aliasGrupo;	
						pedido.icon = 'people';
						pedido.icon = pedido.aliasGrupo == 'Personal' ? 'person' : pedido.icon;
					//	pedido.icon = pedido.tipo == 'NODOS' ? 'people_outline' : pedido.icon;		
						//pedido.aliasGrupo = pedido.aliasGrupo == null ? 'Personal' : pedido.aliasGrupo;				
						vm.pedidos.push(pedido);
					}	
				});
				
				if (vm.carrito != null) {
					// vm.carrito = vm.pedidos[0];
					vm.carrito = StateCommons.ls.pedidoSeleccionado;
				} else {
					vm.carrito = vm.pedidos[0];
				}


			}	
			function doNoOk(response) {
				$log.debug("---no esta logueado ---");

			}
			
			gccService.pedidosByUser(doNoOk).then(doOk)
		}
		*/
		///////////////////////////// fin call service 

		/////// inti

		if (vm.isLogued)
			callGrupos();

	}
})();