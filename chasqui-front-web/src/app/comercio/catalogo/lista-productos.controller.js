(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosController',
		ListaProductosController);

	/**
	 * @ngInject Lista de productos.
	 */
	function ListaProductosController($scope, $rootScope, $log, CTE_REST,
		$state, StateCommons, ToastCommons, dialogCommons, productoService, utilsService,
		gccService, $mdDialog, productorService, contextoCompraService) {

		$log.debug('ListaProductosController',
			$scope.$parent.$parent.catalogoCtrl.isFiltro1);

		var CANT_ITEMS = CTE_REST.PRODUCTOS_X_PAG; // TODO : pasar a constante

		var vm = this;

		vm.otherCtrl = $scope.$parent.$parent.catalogoCtrl.isFiltro1;

		vm.urlBase = CTE_REST.url_base;
		vm.productos = [];
		vm.ultimoFiltro = {};
		vm.medallaSelect = undefined;
		vm.pedidoSelected = undefined;
		vm.grupoSelected = undefined;
		vm.emprendedores = [];
		vm.emprendedorSelect = {};

		//////// dialogo medalla
		vm.showPrerenderedDialog = function(medalla) {
			vm.medallaSelect = medalla;
			$mdDialog.show({
				contentElement: '#myDialog',
				parent: angular.element(document.body),
				//targetEvent: ev,
				clickOutsideToClose: true
			});
		};

		vm.showPrerenderedDialogProductor = function(id) {

			angular.forEach(vm.emprendedores, function(empr, key) {
				if (empr.idProductor === id)
					vm.emprendedorSelect = empr;
			});

			$mdDialog.show({
				contentElement: '#productorDialog',
				parent: angular.element(document.body),
				//targetEvent: ev,
				clickOutsideToClose: true
			});

		}

		vm.cerrarDialogoMedalla = function() {
			$mdDialog.hide();
		}

		////////////// dialogo producto

		vm.verProducto = function(productoParam) {
			$mdDialog.show({
					controller: 'ProductoDialogController as ctrl',
					templateUrl: 'app/comercio/catalogo/producto.dialog.html',
					//     parent: angular.element(document.body),
					//      targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: false, // Only for -xs, -sm breakpoints.
					locals: { parm: productoParam }
				})
				.then(function(answer) {
					//  vm.mensaje = 'You said the information was "' + answer + '".';
				}, function() {
					//  vm.mensaje = 'You cancelled the dialog.';
				});

		}
		////////////// PAGINACION
		vm.currentPage = 0;
		vm.paging = {
			total: 0,
			current: 1,
			onPageChanged: loadPages,
		};

		function loadPages() {
			console.log('Current page is : ' + vm.paging.current);
			// TODO : Load current page Data here
			vm.currentPage = vm.paging.current;
			findProductos(vm.paging.current, CANT_ITEMS, vm.ultimoFiltro)
		}
		//////////////////////////////

		vm.agregar = function(variante) {
			vm.grupoSelected = contextoCompraService.ls.grupoSelected;
			vm.pedidoSelected = contextoCompraService.ls.pedidoSelected;

			if (StateCommons.isLogued()) {
				agregarProducto(variante);
			} else {
				ToastCommons.mensaje("Te invitamos a ingresar !");
				$log.log('not logued" ', variante);
				contextoCompraService.ls.varianteSelected = variante;
				$state.go('login');
			}
		}

		vm.verMedalla = function(medalla) {
			$log.debug("ver medalla", medalla);

			$state.go('medalla', {
				'idMedalla': medalla
			});
		}

		vm.mostrarDecimales = function(parteDecimal) {
			var res = Number(parteDecimal).toFixed(0).toString();
			if (res.length == 1) res += "0";
			return res;
		}

		vm.identificadorProducto = function(producto) {
			return producto.nombreProducto + " - " + producto.nombreVariedad;
		}


		// ///////////////////////
		// / Recive el evento de filtrado

		$scope.$on('filterEvent', function(event, arg) {
			$log.debug("filterEvent", arg);
			vm.ultimoFiltro = arg;
			vm.paging.total = 0;
			vm.paging.current = 1;
			actualizar(arg);
		});

		function actualizar(arg) {
			findProductos(vm.paging.current, CANT_ITEMS, arg);
		}

		function agregarProducto(variante) {
			if (contextoCompraService.isGrupoIndividualSelected()) {
				agregarProductoIndividual(variante); // es individual
			} else {
				//	ToastCommons.mensaje("error CROSS DOMANIN / entidad duplicada DCC/individual");

				if (contextoCompraService.ls.pedidoSelected) {
					//ToastCommons.mensaje(" selected ");
					agregarProductoDialog(variante);
				} else { //ToastCommons.mensaje("not selected ");
					//$log.error("se intento agregar una variante a un gru´p pero no hay un pedido seleccionado")
					callCrearPedidoGrupal(variante);
				}
			}
		}
		/** Tiene la loginca de crear el pedido sino lo tien */
		/*
		function agregarProductoIndividual(variante){
				function setPedidoYagregarProducto(){
					function doOkPedido(response){
						$log.debug("setPedidoYagregarProducto", response);
						contextoCompraService.setContextoByPedido(response.data);					
						contextoCompraService.refreshPedidos();
						
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
		}*/
		/** v2 sin ir al servicio*/
		function agregarProductoIndividual(variante) {

			function actualizarPedidoIndividual() {
				function doOkPedido(response) {
					$log.debug("setPedidoYagregarProducto", response);
					contextoCompraService.setContextoByPedido(response.data);
					//contextoCompraService.refresh();
					agregarProductoDialog(variante);
				}

				productoService.verPedidoIndividual().then(doOkPedido);
			}

			if (contextoCompraService.tienePedidoInividual()) {
				agregarProductoDialog(variante);
			} else {
				// crear pedido y dialog
				function doNoOK(response) {
					if (utilsService.contieneCadena(response.data.error, CTE_REST.ERROR_YA_TIENE_PEDIDO)) {
						ToastCommons.mensaje(CTE_REST.AGREAR_EN_PEDIDO_EXISTENTE);
						agregarProductoDialog(variante);
					}
				}

				function doOk(response) {
					actualizarPedidoIndividual();
				}

				var json = {};
				json.idVendedor = StateCommons.vendedor().id;

				//si falla es poque ya tiene un pedido abierto TODO mejorar
				productoService.crearPedidoIndividual(json, doNoOK).then(doOk)

			}

		}

		function agregarProductoDialog(variante) {
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

			dialogCommons.prompt('Agregar al changuito', 'Cuantos ' + variante.nombreProducto + ' mecesitas ?',
				'Cantidad', 'Agregar', 'Cancelar', doOk, doNoOk);
		}



		// /////////// REST

		var callAgregarAlCarro = function(variante, cantidad) {
			$log.debug('callAgregarAlCarro para pedido: ',
				contextoCompraService.ls.pedidoSelected);

			var doOk = function(response) {
				$log.log('Agregar producto Response ', response);

				ToastCommons.mensaje("Producto agregado !");
				$rootScope.$emit('lista-producto-agrego-producto');

			}

			var params = {};
			params.idPedido = contextoCompraService.ls.pedidoSelected.id;
			params.idVariante = variante.idVariante;
			params.cantidad = cantidad;

			$log.debug(params)

			productoService.agregarPedidoIndividual(params).then(doOk)
			//		$log.debug(contextoCompraService.ls.pedidoSelected)
		}
		/*
				function callProductosSinFiltro() {
					var json = {
						pagina : 1,
						cantItems : 10,
						precio : 'Down',
						idVendedor : StateCommons.vendedor().id
					}
					function doOk(response) {
						vm.productos = response.data.productos;
						
						vm.paging.total = response.data.itemsTotal;
						vm.paging.current = response.data.paginaActual;

					}
					productoService.getProductosSinFiltro(json).then(doOk)
					
				}
		*/
		var findProductos = function(pagina, items, filtro) {
			$log.log('findProductos: ' + pagina + " " + items + " " +
				filtro.tipo + " " + filtro.valor);

			function doOk(response) {
				$log.log('findProductos Response ', response);
				vm.productos = response.data.productos;

				vm.paging.total = Math.ceil(response.data.total / CANT_ITEMS);
				vm.paging.current = response.data.pagina;
			}

			var params = {
				pagina: pagina,
				cantItems: items,
				precio: 'Down'
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

					if (params.idMedalla > 10000) {
						params.idMedalla = params.idMedalla - 10000;
						productoService.getProductosByMedallaProductor(params).then(doOk);
					} else {
						productoService.getProductosByMedalla(params).then(doOk);
					}

					break;
				case 'QUERY':
					params.query = filtro.valor;
					params.idVendedor = StateCommons.vendedor().id;
					productoService.getProductosByQuery(params).then(doOk)
					break;
				default:
					//	params.query = filtro.valor;
					$log.log('mostrar productos sin filtrar');
					params.idVendedor = StateCommons.vendedor().id;
					productoService.getProductosSinFiltro(params).then(doOk)
					break;
			}


		}

		function callCrearPedidoGrupal(variante) {

			function doOK(response) {
				$log.debug("callCrearPedidoGrupal", response);
				contextoCompraService.refreshPedidos().then(
					function(pedido) {
						//contextoCompraService.ls.pedidoSelected = response.data;		
						//vm.pedidoSelected = response.data;		
						vm.pedidoSelected = contextoCompraService.ls.pedidoSelected;
						agregarProductoDialog(variante)
					}
				)


			}

			function doNoOK(response) {

				if (response.data.error.includes("existe un pedido vigent")) {
					$log.debug("ya tenia un pedido vigente");
					agregarProductoDialog(variante)
				}

			}


			var params = {}
			params.idGrupo = contextoCompraService.ls.grupoSelected.idGrupo;
			params.idVendedor = StateCommons.vendedor().id;

			gccService.crearPedidoGrupal(params, doNoOK).then(doOK);
		}

		function callEmprendedores() {
			$log.debug("---callEmprendedor ---");

			productorService.getProductores()
				.then(function(data) { vm.emprendedores = data.data; })
		}

		// findProductos();
		if (!utilsService.isUndefinedOrNull(contextoCompraService.ls.varianteSelected)) {
			$log.debug("tiene una variante seleccionda", contextoCompraService.ls.varianteSelected)
			vm.agregar(contextoCompraService.ls.varianteSelected)
			contextoCompraService.ls.varianteSelected = undefined;
		}

		//vm.productos = findProductos(1,10,{});
		callEmprendedores();
	}

})();
