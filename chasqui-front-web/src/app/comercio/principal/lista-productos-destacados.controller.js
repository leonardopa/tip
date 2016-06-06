(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosDestacadosController',
			ListaProductosDestacadosController);

	/** @ngInject */
	function ListaProductosDestacadosController($http, $log, $scope, restProxy,
			CTE_REST,$timeout ) {
		$log.log('ListaProductosDestacadosController ..... ');

		var vm = this;

		$scope.myInterval = 3000;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		var slides = $scope.slides = [];
		var currIndex = 0;

		vm.variantes =[];
		
		var findProductos = function() {

			function doOk(response) {
				$log.log('findProductos destacads', response);
				vm.variantes = response.data;
				
			}

			restProxy.get(CTE_REST.productosDestacados, {}, doOk);

		}

	//	$timeout(findProductos, 5000);
		findProductos();

	}
})();
