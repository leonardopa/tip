(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosDestacadosController',
		ListaProductosDestacadosController);

	/** @ngInject */
	function ListaProductosDestacadosController($http, $log, $scope, restProxy,
		CTE_REST, $timeout, StateCommons, productoService) {
		$log.log('ListaProductosDestacadosController ..... ');

		var vm = this;
		vm.urlbase = CTE_REST.url_base;
		vm.variantes = [];

		function findProductos() {
			productoService.getProductosDestacados()
				.then(function(response) {
					vm.variantes = response.data.productos;
				})
				.catch(function(err) {
					ToastCommons.mensaje(err.data.error);
				});
		}

		findProductos();

	}
})();