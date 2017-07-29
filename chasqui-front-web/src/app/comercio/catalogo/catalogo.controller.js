(function() {
	'use strict';

	angular
		.module('chasqui')
		.controller('CatalogoController', CatalogoController);

	/**
	 * Pagina donde se muestran los productos. Contiene los filtros y el
	 * contexto de compra , pero NO la lista de productos la cual se incluye
	 */
	function CatalogoController($scope, $log, CTE_REST, $timeout, StateCommons, productorService,
		productoService, ToastCommons, gccService, utilsService, $mdSidenav, $state) {
		$log.debug("CatalogoController ..... grupoSelected", StateCommons.ls.grupoSelected);

		StateCommons.ls.itemMenuSelect = 'catalogo';
		var vm = this;

		vm.toggleLeft = buildToggler('left');
		vm.toggleRight = buildToggler('right');

		function buildToggler(componentId) {
			return function() {
				$mdSidenav(componentId).toggle();
			};
		}

		vm.isLogued = StateCommons.isLogued();

		// vm.categorias = ['categorias 1', 'categorias 2 ', 'categorias 3', 'categorias
		// 4'];
		vm.categorias = [];
		vm.productores = [];
		vm.medallas = [];
		vm.query = '';


		vm.paginaProducto;
		vm.tipoFiltro = 'CATEGORIA'; // PRODUCTOR / MEDALLA / QUERY
		vm.queryText;
		vm.categoriaSelect;
		vm.productorSelect;
		vm.medallaSelect;
		vm.sinFiltroSelect;

		vm.urlBase = CTE_REST.url_base;

		vm.filtroPor = function(filtroPor) {
			$log.debug("filtro por ", filtroPor);

			vm.tipoFiltro = filtroPor;
			// / eliminar los otros selects
			switch (filtroPor) {
				case 'PRODUCTOR':
					vm.queryText = null;
					vm.categoriaSelect = null;
					vm.medallaSelect = null;
					break;
				case 'MEDALLA':
					vm.queryText = null;
					vm.categoriaSelect = null;
					vm.productorSelect = null;
					break;
				case 'CATEGORIA':
					vm.queryText = null;
					vm.productorSelect = null;
					vm.medallaSelect = null;
					break;
				default:
					vm.sinFiltroSelect = null;
			}

			vm.filtrar();
		}

		vm.filtrar = function() {
			switch (vm.tipoFiltro) {
				case 'PRODUCTOR':
					doFiltrar(vm.productorSelect);
					break;
				case 'MEDALLA':
					doFiltrar(vm.medallaSelect);
					break;
				case 'CATEGORIA':
					doFiltrar(vm.categoriaSelect);
					break;
				case 'QUERY':
					doFiltrar(vm.queryText);
					break;
				default:
					// Agregado 16/12
					doFiltrar(vm.sinFiltroSelect);
					break;
			}

		}

		vm.filtroQuery = function() {
			vm.tipoFiltro = 'QUERY';
			if (utilsService.isEmpty(vm.queryText)) {
				vm.tipoFiltro = undefined;
				vm.filtroPor(undefined);
			}

			vm.categoriaSelect = null;
			vm.productorSelect = null;
			vm.medallaSelect = null;
			vm.sinFiltroSelect = null;
			doFiltrar(vm.queryText);
		}

		var doFiltrar = function(valor) {
			var filtro = {};
			filtro.tipo = vm.tipoFiltro;
			filtro.valor = valor;
			$scope.$broadcast('filterEvent', filtro); // llama al evento del
			// list-producto-controller
		}


		// / CALL REST



		function callCategorias() {
			productoService.getCategorias()
				.then(function(response) {
					vm.categorias = response.data;
					vm.categoriaSelect = vm.categorias[0];
				})

		}

		function callProductores() {
			productorService.getProductores()
				.then(function(response) {
					vm.productores = response.data;
				})
		}

		function callMedallas() {
			productoService.getMedallas()
				.then(function(response) {
					vm.medallas = vm.medallas.concat(response.data);
				})
		}

		function callMedallasProductores() {
			productorService.getMedallas()
				.then(function(response) {
					vm.medallasProductores = response.data;
					angular.forEach(response.data, function(medalla, key) {
						//para que no repita ID con la de producto, ademas para diferenciarlas despes
						medalla.idMedalla = medalla.idMedalla + 10000;
						vm.medallas.push(medalla);
					});
				})
		}

		callCategorias();
		callProductores();
		callMedallas();
		callMedallasProductores();

	}
})();
