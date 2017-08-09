(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosDestacadosController',
		ListaProductosDestacadosController);

	/** @ngInject */
	function ListaProductosDestacadosController($log, $scope,
		CTE_REST, productoService) {
		$log.log('ListaProductosDestacadosController ..... ');

		var vm = this;
		vm.urlbase = CTE_REST.url_base;
		vm.variantes = [];

		function findProductos() {
			productoService.getProductosDestacados()
				.then(function(response) {
					vm.variantes = response.data.productos;
				})
		}

		findProductos();

		vm.mostrarDecimales = function(parteDecimal) {
			var res = Number(parteDecimal).toFixed(0).toString();
			if (res.length == 1) res += "0";
			return res;
		}
	}
})();
