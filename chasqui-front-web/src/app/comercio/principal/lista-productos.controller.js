(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosController',
			ListaProductosController);

	/**
	 * @ngInject Lista de productos.
	 */
	function ListaProductosController($scope, $http, $log, restProxy, CTE_REST,
			$mdDialog,$state) {
		$log
				.debug(
						'ListaProductosController ..... Recibe productos desde otra pagina ',
						$scope.pedido);

		var CANT_ITEMS = 10; // TODO : pasar a constante
		
		var vm = this;
		
		vm.isPaginaPrincipal = ($scope.pedido == undefined);
		vm.pedido = $scope.pedido;
		vm.variantes = [];

		vm.pageChanged = function() {
			$log.log('Page changed to: ' + vm.bigCurrentPage);
			findProductos(vm.bigCurrentPage, CANT_ITEMS);
		};

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

		vm.agregar = function(variante) {
			$log.debug("agregar ", variante)
			var confirm = $mdDialog.prompt().title(
					'Agregar producto del Changuito').textContent(
					'Cuanto producto queres Agregar ?').placeholder(
					'Cantidad')
			// .ariaLabel('Dog name')
			// .initialValue(1)
			// .targetEvent(ev)
			.ok('Agregar').cancel('Cancelar');

			$mdDialog.show(confirm).then(function(result) {
				$log.debug("Agregar OK", result);

				if (!isNaN(result) &&  result > 0) {
					$log.debug("Entrada valida", result);
					callAgregarAlCarro(variante, result);
				} else {
					$log.debug("Entrada invalida", result);
				}

			}, function() {

				$log.debug("Cancelo Agregar");
			});
		}

		// /////////// REST

		var findProductos = function(pagina, items) {
			$log.log('findProductos: ' + pagina + " " + items);

			function doOk(response) {
				$log.log('findProductos Response ', response);
				vm.variantes = response.data.productos;

				vm.maxSize = 10;
				vm.bigTotalItems = response.data.itemsTotal;
				vm.bigCurrentPage = response.data.paginaActual;
			}

			restProxy.get(CTE_REST.productosPaginado(pagina, items), {}, doOk);

		}

		var callAgregarAlCarro = function(variante, cantidad) {
			$log.debug('callAgregarAlCarro: ', variante);

			function doOk(response) {
				//TODO: mensaje OK
				$log.log('Agregar producto Response ', response);

			}
			// / TODO : USUARIO HARDOC y pedido 
			restProxy.post(
					CTE_REST.productosAgregar(11,99, cantidad),
					variante, doOk);

		}

		var callQuitarProducto = function(variante,cantidad) {
			$log.log('callQuitarProducto: ');

			function doOk(response) {
				$log.log('callQuitarProducto Response ', response);

			}
			// / TODO : USUARIO HARDOC
			restProxy.post(CTE_REST.productosQuitar(77, vm.pedido.id,cantidad), variante,
					doOk);

		}

		// productosQuitarProducto
		// /pedidos/usuario/{idUser}/grupo/{idGrupo}/quitarProducto

		// Puede ser para listar los pedidos o para la pantalla principal
		if (vm.isPaginaPrincipal) {
			findProductos(1, CANT_ITEMS);
		} else {
			vm.variantes = $scope.pedido.productos
		}

	}
})();
