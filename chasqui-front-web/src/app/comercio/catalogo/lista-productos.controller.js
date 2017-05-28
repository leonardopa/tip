(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosController',
			ListaProductosController);

	/**
	 * @ngInject Lista de productos.
	 */
	function ListaProductosController($scope, $log, CTE_REST,
			$state, StateCommons, ToastCommons, dialogCommons,productoService,utilsService,$mdDialog) {

		$log.debug('ListaProductosController',
				$scope.$parent.$parent.catalogoCtrl.isFiltro1);

		var CANT_ITEMS = 10; // TODO : pasar a constante

		var vm = this;

		vm.otherCtrl = $scope.$parent.$parent.catalogoCtrl.isFiltro1;

		vm.urlBase = CTE_REST.url_base;
		vm.variantes = [];		
		vm.ultimoFiltro = {};
		vm.medallaSelect=undefined;
		vm.pedidoSelected=StateCommons.ls.pedidoSelected;
		//////// dialogo medalla
		vm.showPrerenderedDialog = function(medalla) {	
			vm.medallaSelect=medalla;
		    $mdDialog.show({
		      contentElement: '#myDialog',
		      parent: angular.element(document.body),
		      //targetEvent: ev,
		      clickOutsideToClose: true
		    });
		  };

		 vm.cerrarDialogoMedalla=function (){
		 	$mdDialog.hide();
		 }

		 ////////////// dialogo producto

		 vm.verProducto = function(productoParam) {
		 	 $mdDialog.show({
		      controller: 'ProductoDialogController as ctrl',
		      templateUrl: '/app/comercio/catalogo/producto.dialog.html',
		 //     parent: angular.element(document.body),
		//      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen:false,// Only for -xs, -sm breakpoints.
			  locals:{parm : productoParam}
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
		        findProductos(vm.paging.current,CANT_ITEMS,vm.ultimoFiltro)
		}
		//////////////////////////////

		vm.agregar = function(variante) {
			if (StateCommons.isLogued()){
				agregarProducto(variante);
			}else{
				ToastCommons.mensaje("TODO not logued");
				$log.log('not logued" ' , variante);
				StateCommons.ls.varianteSelected=variante;
				$state.go('login');
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
			vm.ultimoFiltro=arg;
			vm.paging.total=0;
			vm.paging.current=1;
			actualizar(arg);
		});

		function actualizar(arg) {
			findProductos(vm.paging.current,CANT_ITEMS, arg);
		}

		function agregarProducto(variante){		
			if (StateCommons.isPedidoInividualSelected()){
				agregarProductoIndividual(variante);// es individual
			}else{
				ToastCommons.mensaje("TODO agregar al carro pedido grupal");
			}
			/*		
			if(StateCommons.ls.pedidoSelected.idGrupo==null){
				agregarProductoIndividual(variante);// es individual
			}else{
				if(StateCommons.ls.pedidoSelected){
					agregarProductoDialog(variante);// es grupal			
				}else{
					$log.error("se intento agregar una variante a un gru´p pero no hay un pedido seleccionado")
					StateCommons.ls.pedidoSelected = undefined;
				}
			}*/	
		}
		/** Tiene la loginca de crear el pedido sino lo tien */
		function agregarProductoIndividual(variante){
			function setPedidoYagregarProducto(){
					function doOkPedido(response){
						$log.debug("setPedidoYagregarProducto", response);
						StateCommons.ls.pedidoSelected = response.data;					
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

			dialogCommons.prompt('Agregar al changuito', 'Cuantos '+variante.nombreProducto + ' mecesitas ?',
					'Cantidad', 'Agregar', 'Cancelar', doOk, doNoOk);
		}

		

		// /////////// REST

		var callAgregarAlCarro = function(variante, cantidad) {
			$log.debug('callAgregarAlCarro para pedido: ',
					StateCommons.ls.pedidoSelected);
		 
			var doOk = function (response) {
				$log.log('Agregar producto Response ', response);
				ToastCommons.mensaje("Producto agregado !");
			}

			
			var params = {};
			params.idPedido = StateCommons.ls.pedidoSelected.id;
			params.idVariante = variante.idVariante;
			params.cantidad = cantidad;

			productoService.agregarPedidoIndividual(params).then(doOk)

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
				vm.variantes = response.data.productos;
				
				vm.paging.total = response.data.itemsTotal;
				vm.paging.current = response.data.paginaActual;

			}
			productoService.getProductosSinFiltro(json).then(doOk)
			
		}
*/
		var findProductos = function(pagina, items, filtro) {
			$log.log('findProductos: ' + pagina + " " + items + " "
					+ filtro.tipo + " " + filtro.valor);

			function doOk(response) {
				$log.log('findProductos Response ', response);
				vm.variantes = response.data.productos;			 	

				vm.paging.total = Math.ceil(response.data.total / CANT_ITEMS) ;
				vm.paging.current = response.data.pagina;
			}

			var params = {
				pagina : pagina,
				cantItems : items,
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
			//	params.query = filtro.valor;
				$log.log('mostrar productos sin filtrar');
				params.idVendedor = StateCommons.vendedor().id;				
				productoService.getProductosSinFiltro(params).then(doOk)
				break;
			}
			
			
		}

		// findProductos();
		if (! utilsService.isUndefinedOrNull(StateCommons.ls.varianteSelected)){
			$log.debug("tiene una variante seleccionda" ,StateCommons.ls.varianteSelected )
			vm.agregar(StateCommons.ls.varianteSelected)
			StateCommons.ls.varianteSelected=undefined;
		}

		//vm.variantes = findProductos(1,10,{});
	}

})();
