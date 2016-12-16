(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosDestacadosController',
			ListaProductosDestacadosController);

	/** @ngInject */
	function ListaProductosDestacadosController($http, $log, $scope, restProxy,
			CTE_REST,$timeout,StateCommons ) {
		$log.log('ListaProductosDestacadosController ..... ');

		var vm = this;

		$scope.myInterval = 3000;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		var slides = $scope.slides = [];
		var currIndex = 0;

		
		var mock =[{"idProducto":0,"idCategoria":1,"idFabricante":1,"idVariante":0,"nombreProducto":CTE_REST.productosDestacados,"nombreCategoria":"nombreCategoria0","nombreFabricante":"nombreFabricante","nombreVariente":"nombreVariente0","descripcionVariente":"descripcionVariente0","descripcionProducto":"descripcionProducto0","descripcionCateoria":"descripcionCateoria0","precioParteEntera":650,"precioParteDecimal":53,"cantidad":null},{"idProducto":1,"idCategoria":1,"idFabricante":1,"idVariante":1,"nombreProducto":"nombreProducto1","nombreCategoria":"nombreCategoria0","nombreFabricante":"nombreFabricante","nombreVariente":"nombreVariente1","descripcionVariente":"descripcionVariente1","descripcionProducto":"descripcionProducto1","descripcionCateoria":"descripcionCateoria0","precioParteEntera":798,"precioParteDecimal":74,"cantidad":null},{"idProducto":2,"idCategoria":1,"idFabricante":1,"idVariante":2,"nombreProducto":"nombreProducto2","nombreCategoria":"nombreCategoria0","nombreFabricante":"nombreFabricante","nombreVariente":"nombreVariente2","descripcionVariente":"descripcionVariente2","descripcionProducto":"descripcionProducto2","descripcionCateoria":"descripcionCateoria0","precioParteEntera":118,"precioParteDecimal":47,"cantidad":null},{"idProducto":3,"idCategoria":1,"idFabricante":1,"idVariante":0,"nombreProducto":"nombreProducto3","nombreCategoria":"nombreCategoria1","nombreFabricante":"nombreFabricante","nombreVariente":"nombreVariente0","descripcionVariente":"descripcionVariente0","descripcionProducto":"descripcionProducto3","descripcionCateoria":"descripcionCateoria1","precioParteEntera":454,"precioParteDecimal":21,"cantidad":null},{"idProducto":4,"idCategoria":1,"idFabricante":1,"idVariante":1,"nombreProducto":"nombreProducto4","nombreCategoria":"nombreCategoria1","nombreFabricante":"nombreFabricante","nombreVariente":"nombreVariente1","descripcionVariente":"descripcionVariente1","descripcionProducto":"descripcionProducto4","descripcionCateoria":"descripcionCateoria1","precioParteEntera":12,"precioParteDecimal":73,"cantidad":null},{"idProducto":5,"idCategoria":1,"idFabricante":1,"idVariante":2,"nombreProducto":"nombreProducto5","nombreCategoria":"nombreCategoria1","nombreFabricante":"nombreFabricante","nombreVariente":"nombreVariente2","descripcionVariente":"descripcionVariente2","descripcionProducto":"descripcionProducto5","descripcionCateoria":"descripcionCateoria1","precioParteEntera":464,"precioParteDecimal":51,"cantidad":null}];
		vm.variantes = mock;
	    vm.urlbase=CTE_REST.url_base; 
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
