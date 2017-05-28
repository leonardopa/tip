(function() {
	'use strict';

	angular
		.module('chasqui')
		.controller('ContextoCompraController', ContextoCompraController);

	/**
	 * Lista lateral de productos del pedido seleccionado
	 */
	function ContextoCompraController($rootScope,$log,CTE_REST,StateCommons,gccService,utilsService
		,productoService,$timeout) {	
		
		$log.debug("ContextoCompraController ..... ", StateCommons.ls.grupoSelected);
		var vm = this;
		
	
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
	 
		vm.hoverIn = function(){
		    vm.isOpen = true;
		};

		vm.hoverOut = function(){
		    vm.isOpen = false;
		};
		/////////////////////////////////////////////////

		// Representa el conepto de grupo indivial para el caso de que no tiene un pedido abierto
		var gIndividualFicticio={}
		gIndividualFicticio.alias="Personal";
		gIndividualFicticio.esAdministrador=true;
		gIndividualFicticio.idPedidoIndividual="Personal";
		
		vm.isLogued=StateCommons.isLogued();
		vm.grupos = [gIndividualFicticio];
		vm.grupoSelected=gIndividualFicticio;
	/*
		vm.checkAlias=function(){
			if (vm.grupos)
				return vm.pedidoSelected.aliasGrupo == null ? 'Personal' : vm.pedidoSelected.aliasGrupo;
		}*/
/*
		function definirGrupoSeleccionado(){
			//vm.carrito = StateCommons.ls.pedidoSelected;
			$log.debug("***** 1 ", StateCommons.ls.grupoSelected);
			if(utilsService.isUndefinedOrNull(StateCommons.ls.grupoSelected)){	
				vm.grupoSelected = gIndividualFicticio;
			}else{			
				var individual;
				$log.debug("***** 2 ",vm.grupos);
				angular.forEach(vm.grupos, function(value, key){

				     if (value.idGrupo == null) 
				     	individual = value;
				});

				if (individual){
					vm.grupoSelected = individual;
				}else{
					vm.grupoSelected=gIndividualFicticio;		
				}

				StateCommons.ls.grupoSelected=vm.grupoSelected;
			}

			//vm.grupos.push(gIndividualFicticio);
		}
*/
		vm.cambiarContexto = function(grupo) {
			$log.debug("cambia contexo de carrito ", grupo);
			
			$rootScope.$emit('contexto.compra.cambia.grupo', grupo);

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
			function doOK(response){					
				vm.grupos = vm.grupos.concat(response.data);				
			}

			gccService.gruposByusuario().then(doOK);
		}

	
		///////////////////////////// fin call service 

		/////// inti

		if (vm.isLogued){			
			callGrupos();
		}
		

	}
})();