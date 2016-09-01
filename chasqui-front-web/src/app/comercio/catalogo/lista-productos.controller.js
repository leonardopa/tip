(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosController',
			ListaProductosController);

	/**
	 * @ngInject Lista de productos.
	 */
	function ListaProductosController($scope, $http, $log, restProxy, CTE_REST,
			$mdDialog,$state) {
	
		$log.debug('ListaProductosController',$scope.$parent.$parent.catalogoCtrl.isFiltro1);
		
		var CANT_ITEMS = 10; // TODO : pasar a constante
		
		var vm = this;
		
		vm.otherCtrl=$scope.$parent.$parent.catalogoCtrl.isFiltro1;
		
		vm.variantes = [];
	
		vm.pageChanged = function() {
			$log.log('Page changed to: ' + vm.bigCurrentPage);
			findProductos(vm.bigCurrentPage, CANT_ITEMS);
		};

		 
		vm.agregar = function(variante) {
			$log.debug("agregar ", variante)
			var confirm = $mdDialog.prompt().title(
					'Agregar producto del Changuito').textContent(
					'Cuanto producto queres Agregar ?').placeholder(
					'Cantidad')
			// .ariaLabel('Dog name')
			// .initialValue(1)
			// .targetEvent(ev)
			.ok('Agregar').cancel('Cancelar');

			$mdDialog.show(confirm).then(function(result) {
				$log.debug("Agregar OK", result);

				if (!isNaN(result) &&  result > 0) {
					$log.debug("Entrada valida", result);
					callAgregarAlCarro(variante, result);
				} else {
					$log.debug("Entrada invalida", result);
				}

			}, function() {

				$log.debug("Cancelo Agregar");
			});
		}

		
		vm.verMedalla=function (medalla){
			$log.debug("ver medalla",medalla);
			
			$state.go('medalla',{'idMedalla':medalla});
		}
		// /////////// REST

		var callAgregarAlCarro = function(variante, cantidad) {
			$log.debug('callAgregarAlCarro: ', variante);

			function doOk(response) {
				//TODO: mensaje OK
				$log.log('Agregar producto Response ', response);

			}
			// / TODO : USUARIO HARDOC y pedido 
			restProxy.post(
					CTE_REST.productosAgregar(11,99, cantidad),
					variante, doOk);

		}

		var findProductos = function(pagina, items) {
			$log.log('findProductos: ' + pagina + " " + items);

			function doOk(response) {
				$log.log('findProductos Response ', response);
				vm.variantes = response.data.productos;

				vm.maxSize = 10;
				vm.bigTotalItems = response.data.itemsTotal;
				vm.bigCurrentPage = response.data.paginaActual;
			}

			var json= {
					  "pagina": 1,
					  "cantItems": 20,
					  "precio": "Up",
					  "idCategoria": "1",
					  "idProductor" :"1" ,
					   "idMedalla" : "1",
					   "query": "1",
					   "idVendedor":"1"
					};
			
			restProxy.post(CTE_REST.productosByCategoria, json, doOk);

		}
		
		findProductos();

	}
})();
