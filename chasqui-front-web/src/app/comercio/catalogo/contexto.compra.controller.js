(function() {
	'use strict';

	angular
		.module('chasqui')
		.controller('ContextoCompraController', ContextoCompraController);

	/**
	 * Lista lateral de productos del pedido seleccionado
	 */
	function ContextoCompraController($rootScope, $log, $timeout, StateCommons, contextoCompraService) {

		$log.debug("ContextoCompraController ..... ");

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

		vm.hoverIn = function() {
			vm.isOpen = true;
		};

		vm.hoverOut = function() {
			vm.isOpen = false;
		};
		/////////////////////////////////////////////////

		vm.isLogued = StateCommons.isLogued();
		//vm.grupos = contextoCompraService.ls.grupos;
		contextoCompraService.getGrupos().then(
			function(response) {
				vm.grupos = response;
			})

		vm.grupoSelected = contextoCompraService.ls.grupoSelected;


		vm.cambiarContexto = function(grupo) {
			$log.debug("cambia contexo de carrito ", grupo);

			vm.grupoSelected = grupo;
			contextoCompraService.setContextoByGrupo(grupo);

			vm.icon = 'person';
			// vm.icon='shopping_cart';
			$timeout(function() {
				vm.icon = 'shopping_cart';
				// /vm.icon=pedido.icon;
			}, 1500);

		}



	}
})();
