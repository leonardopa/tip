(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosPedidoController',
		ListaProductosPedidoController);

	/**
	 * @ngInject Lista de productos para la pagina de pedidos.
	 */
	function ListaProductosPedidoController($scope, $http, $log, restProxy, CTE_REST,
		$mdDialog, $state) {
		$log.debug('ListaProductosPedidoController');
		$log.debug('Pedido', $scope.pedido);

		var vm = this;

		vm.pedido = $scope.pedido;
		vm.variantes = $scope.pedido.productos;

		vm.quitar = function(variante) {
			$log.debug("quitar ", variante);

			var confirm = $mdDialog.prompt().title(
					'Quitar producto del Changuito').textContent(
					'Cuanto producto queres quitar ?').placeholder(
					'Cantidad entre 1 y ' + variante.cantidad)
				// .ariaLabel('Dog name')
				// .initialValue('Buddy')
				// .targetEvent(ev)
				.ok('Quitar').cancel('Cancelar');

			$mdDialog.show(confirm).then(function(result) {
				$log.debug("quitar OK", result);

				if (!isNaN(result) && result <= variante.cantidad && result > 0) {
					$log.debug("Entrada valida", result);
					callQuitarProducto(variante, result);
				} else {
					$log.debug("Entrada invalida", result);
				}

			}, function() {

				$log.debug("Cancelo Quitar");
			});

		}



		// /////////// REST

		var callQuitarProducto = function(variante, cantidad) {
			$log.log('callQuitarProducto: ');

			function doOk(response) {
				$log.log('callQuitarProducto Response ', response);

			}
			// / TODO : USUARIO HARDOC
			restProxy.post(CTE_REST.productosQuitar(77, vm.pedido.id, cantidad), variante,
				doOk);

		}

	}
})();
