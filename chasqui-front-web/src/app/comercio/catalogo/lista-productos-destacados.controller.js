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

		
	
       
	    vm.urlbase= CTE_REST.url_base; 
	    vm.variantes=[];
	    function findProductos() {
				$log.log('findProductos destacados');
				function doOk(response) {
					$log.log('findProductos destacados', response);
					vm.variantes = response.data.productos;
				}
				function notOk(response){
					vm.hello=response;
				}
				restProxy.get(CTE_REST.productosDestacadosByVendedor(CTE_REST.idVendedor), {}, doOk);
	    }
	//	$timeout(findProductos, 5000);
	 	findProductos();

	}
})();
