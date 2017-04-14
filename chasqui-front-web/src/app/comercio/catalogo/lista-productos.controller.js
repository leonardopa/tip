(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosController',
			ListaProductosController);

	/**
	 * @ngInject Lista de productos.
	 */
	function ListaProductosController($scope, $log, CTE_REST,
			$state, StateCommons, ToastCommons, dialogCommons,productoService,utilsService) {

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
			
		}

		vm.pageChanged = function() {
			$log.log('Page changed to: ' + vm.bigCurrentPage);
			findProductos(vm.bigCurrentPage, CANT_ITEMS);
		};
 
		vm.agregar = function(variante) {
			if (StateCommons.isLogued()){
				crearPedidoYagregarProducto(variante);
			}else{
				ToastCommons.mensaje("TODO not logued");
			}
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

		function crearPedidoYagregarProducto(variante){			

			function setPedidoYagregarProducto(){
				function doOkPedido(response){
					$log.debug("setPedidoYagregarProducto", response);
					StateCommons.ls.pedidoSeleccionado = response.data;					
				}

				productoService.verPedidoIndividual().then(doOkPedido);

				agregarProductoDialog(variante)				
			}

			function doNoOK(response){			
				if(utilsService.contieneCadena(response.data.error,CTE_REST.ERROR_YA_TIENE_PEDIDO)){
					ToastCommons.mensaje(CTE_REST.AGREAR_EN_PEDIDO_EXISTENTE);
					setPedidoYagregarProducto();
				}
			}

			function doOk(){
				setPedidoYagregarProducto();
			}

			var json = {};
			json.idVendedor = StateCommons.vendedor().id;
			

			//si falla es poque ya tiene un pedido abierto TODO mejorar
			productoService.crearPedidoIndividual(json,doNoOK).then(doOk)
		}

		function agregarProductoDialog(variante){
			$log.debug("agregarProductoDialog ", variante)

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

		

		// /////////// REST

		var callAgregarAlCarro = function(variante, cantidad) {
			$log.debug('callAgregarAlCarro para pedido: ',
					StateCommons.ls.pedidoSeleccionado);
		 
			var doOk = function (response) {
				$log.log('Agregar producto Response ', response);
				ToastCommons.mensaje("Producto agregado !");
			}

			
			var params = {};
			params.idPedido = StateCommons.ls.pedidoSeleccionado.id;
			params.idVariante = variante.idVariante;
			params.cantidad = cantidad;

			productoService.agregarPedidoIndividual(params).then(doOk)

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
