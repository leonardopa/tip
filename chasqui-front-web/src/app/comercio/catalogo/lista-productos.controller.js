(function() {
	'use strict';

	angular.module('chasqui').controller('ListaProductosController',
			ListaProductosController);

	/**
	 * @ngInject Lista de productos.
	 */
	function ListaProductosController($scope, $http, $log, restProxy, CTE_REST,
			$mdDialog,$state,StateCommons,ToastCommons) {
	
		$log.debug('ListaProductosController',$scope.$parent.$parent.catalogoCtrl.isFiltro1);
			
		var CANT_ITEMS = 10; // TODO : pasar a constante
		
		var vm = this;
		
		vm.otherCtrl=$scope.$parent.$parent.catalogoCtrl.isFiltro1;
		
		vm.urlBase = CTE_REST.url_base;
		vm.variantes = [];
		vm.variantes = callProductosSinFiltro();


		function callProductosSinFiltro() {
			$log.debug("---hola favio ---");

			var json = {
                    pagina: 1,
                    cantItems: 10,
                    precio: 'Down',
                    idVendedor: StateCommons.vendedor().id,
                   
            }

			function doOk(response) {				 
			
				vm.variantes = response.data.productos;

				vm.maxSize = 10;
				vm.bigTotalItems = response.data.itemsTotal;
				vm.bigCurrentPage = response.data.paginaActual;

			}
		
			restProxy.postPublic(CTE_REST.productosSinFiltro(StateCommons.vendedor().id),json,doOk);		    
	 }







	
		vm.pageChanged = function() {
			$log.log('Page changed to: ' + vm.bigCurrentPage);
			findProductos(vm.bigCurrentPage, CANT_ITEMS);
		};

		 
		vm.agregar = function(variante) {
			$log.debug("agregar ", variante)
			var confirm = $mdDialog.prompt().title(
					'Agregar producto del Changuito').textContent(
					'Cuantos productos queres Agregar ?').placeholder(
					'Cantidad')
			// .ariaLabel('Dog name')
			// .initialValue(1)
			// .targetEvent(ev)
			.ok('Agregar').cancel('Cancelar');

			$mdDialog.show(confirm).then(function(result) {
				$log.debug("Agregar al carro cantidad ", result);

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
		
		
		/////////////////////////
		/// Recive el evento de filtrado 
		
		$scope.$on('filterEvent', function(event,arg) 
				{$log.debug("filterEvent",arg);
				  actualizar(arg);});
		
		function actualizar(arg){
			findProductos(1,1,arg);
		}
		
		// /////////// REST

		var callAgregarAlCarro = function(variante, cantidad) {
			$log.debug('callAgregarAlCarro para pedido: ', StateCommons.ls.pedidoSeleccionado);

			function doOk(response) {
				$log.log('Agregar producto Response ', response);
				ToastCommons.mensaje("Producto agregado !");
			}
			
			function doNoOk(response) {

				$log.log('FALLO AGREGAR PRODUCTO ', response);
				ToastCommons.mensaje(response.data.error);
			}
			
			var params={};
			params.idPedido=StateCommons.ls.pedidoSeleccionado.id;
			params.idVariante=variante.idVariante;
			params.cantidad=cantidad;
			 
			restProxy.put(
					CTE_REST.agregarPedidoIndividual,params, doOk,doNoOk);

		}

		var findProductos = function(pagina, items,filtro) {
			$log.log('findProductos: ' + pagina + " " + items + " " + filtro.tipo + " " + filtro.valor);

			function doOk(response) {
				$log.log('findProductos Response ', response);
				vm.variantes = response.data.productos;

				vm.maxSize = 10;
				vm.bigTotalItems = response.data.itemsTotal;
				vm.bigCurrentPage = response.data.paginaActual;
			}
			
			var json = {
                    pagina: 1,
                    cantItems: 5,
                    precio: 'Down'
                    //,idVendedor  =CTE_REST.vendedor //TODO: que se dinamico
            }
			  

			 switch (filtro.tipo) { 
		          case 'CATEGORIA':
		        	  json.idCategoria =filtro.valor ;
		        	  restProxy.postPublic(CTE_REST.productosByCategoria, json, doOk);
		              break;
		          case 'PRODUCTOR':
		        	  json.idProductor = filtro.valor ;
		        	  restProxy.postPublic(CTE_REST.productosByProductor, json, doOk);
		              break;   
		          case 'MEDALLA':
		        	  json.idMedalla = filtro.valor;
				      json.idVendedor = StateCommons.vendedor().id;
		        	  restProxy.postPublic(CTE_REST.productosByMedalla, json, doOk);
		              break;
		          case 'QUERY':
		        	  json.query = filtro.valor;
		        	  json.idVendedor = StateCommons.vendedor().id;
		        	  restProxy.postPublic(CTE_REST.productosByQuery, json, doOk);		
		              break;
		          default:
		             json.query = filtro.valor;
		        	 $log.log('mostrar productos sin filtrar');
		        	 json.idVendedor = StateCommons.vendedor().id;
		        	 restProxy.postPublic(CTE_REST.productosSinFiltro, json, doOk);
		             break;
	          }
		}
		
	//	findProductos();

	}
})();
