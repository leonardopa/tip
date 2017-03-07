(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosController',
			ListaProductosController);

	/**
	 * @ngInject Lista de productos.
	 */
	function ListaProductosController($scope, $log, restProxy, CTE_REST,
			$state, StateCommons, ToastCommons, dialogCommons,productoService) {

		$log.debug('ListaProductosController',
				$scope.$parent.$parent.catalogoCtrl.isFiltro1);

		var CANT_ITEMS = 10; // TODO : pasar a constante

		var vm = this;

		vm.otherCtrl = $scope.$parent.$parent.catalogoCtrl.isFiltro1;

		vm.urlBase = CTE_REST.url_base;
		vm.variantes = [];
		vm.variantes = callProductosSinFiltro();

		function callProductosSinFiltro() {
			var json = {
				pagina : 1,
				cantItems : 10,
				precio : 'Down',
				idVendedor : StateCommons.vendedor().id
			}
			function doOk(response) {
				vm.variantes = response.data.productos;
				vm.maxSize = 10;
				vm.bigTotalItems = response.data.itemsTotal;
				vm.bigCurrentPage = response.data.paginaActual;

			}
			productoService.getProductosSinFiltro(json).then(doOk)
				.catch(function(err) {
					ToastCommons.mensaje(err.data.error);
			});
		}

		vm.pageChanged = function() {
			$log.log('Page changed to: ' + vm.bigCurrentPage);
			findProductos(vm.bigCurrentPage, CANT_ITEMS);
		};

		vm.agregar = function(variante) {
			$log.debug("agregar ", variante)

			function doOk(result) {
				$log.debug("Agregar al carro cantidad ", result);

				if (!isNaN(result) && result > 0) {
					$log.debug("Entrada valida", result);
					callAgregarAlCarro(variante, result);
				} else {
					$log.debug("Entrada invalida", result);
				}

			}

			function doNoOk() {
				$log.debug("Cancelo Agregar")
			}

			dialogCommons.prompt('Agregar al changuito', 'Cuantos mecesitas ?',
					'Cantidad', 'Agregar', 'Cancelar', doOk, doNoOk);
		}

		vm.verMedalla = function(medalla) {
			$log.debug("ver medalla", medalla);

			$state.go('medalla', {
				'idMedalla' : medalla
			});
		}

		// ///////////////////////
		// / Recive el evento de filtrado

		$scope.$on('filterEvent', function(event, arg) {
			$log.debug("filterEvent", arg);
			actualizar(arg);
		});

		function actualizar(arg) {
			findProductos(1, 1, arg);
		}

		// /////////// REST

		var callAgregarAlCarro = function(variante, cantidad) {
			$log.debug('callAgregarAlCarro para pedido: ',
					StateCommons.ls.pedidoSeleccionado);
		 
			var doOk = function (response) {
				$log.log('Agregar producto Response ', response);
				ToastCommons.mensaje("Producto agregado !");
			}

			var doNoOk = function (response) {
				$log.log('FALLO AGREGAR PRODUCTO ', response);
				ToastCommons.mensaje(response.data.error);
			}

			var params = {};
			params.idPedido = StateCommons.ls.pedidoSeleccionado.id;
			params.idVariante = variante.idVariante;
			params.cantidad = cantidad;

			productoService.agregarPedidoIndividual(params).then(doOk)
				.catch(doNoOk);

		}

		var findProductos = function(pagina, items, filtro) {
			$log.log('findProductos: ' + pagina + " " + items + " "
					+ filtro.tipo + " " + filtro.valor);

			function doOk(response) {
				$log.log('findProductos Response ', response);
				vm.variantes = response.data.productos;

				vm.maxSize = 10;
				vm.bigTotalItems = response.data.itemsTotal;
				vm.bigCurrentPage = response.data.paginaActual;
			}

			var params = {
				pagina : 1,
				cantItems : 5,
				precio : 'Down'
			// ,idVendedor =CTE_REST.vendedor //TODO: que se dinamico
			}

			switch (filtro.tipo) {
			case 'CATEGORIA':
				params.idCategoria = filtro.valor;				
				productoService.getProductosByCategoria(params).then(doOk)
				break;
			case 'PRODUCTOR':
				params.idProductor = filtro.valor;				
				productoService.getProductosByProductor(params).then(doOk)
				break;
			case 'MEDALLA':
				params.idMedalla = filtro.valor;
				params.idVendedor = StateCommons.vendedor().id;
				productoService.getProductosByMedalla(params).then(doOk)
				break;
			case 'QUERY':
				params.query = filtro.valor;
				params.idVendedor = StateCommons.vendedor().id;
				productoService.getProductosByQuery(params).then(doOk)				
				break;
			default:
				params.query = filtro.valor;
				$log.log('mostrar productos sin filtrar');
				params.idVendedor = StateCommons.vendedor().id;				
				productoService.getProductosSinFiltro(params).then(doOk)
				break;
			}
			
			
		}

		// findProductos();

	}

})();
