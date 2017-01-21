(function() {
	'use strict';

	angular.module('chasqui').controller('DetallePedidoController',
			DetallePedidoController);

	/** @ngInject */
	function DetallePedidoController($http, $log,$state,$scope,restProxy, CTE_REST,ToastCommons,$mdDialog  ) {
		$log.debug('DetallePedidoController ..... ', $scope.pedido);
		
		var vm = this;
		vm.pedido = $scope.pedido;
		vm.urlBase=CTE_REST.url_base;
		vm.direcciones;
		vm.direccionSelected;
		
		vm.comprar = function (event){
			$log.debug('DetallePedidoController , modo comprar ', $scope.pedido);
			$state.go('catalogo')
		}
		  
		vm.eliminar = function (item){			
			$log.debug('DetallePedidoController , eliminar '
					, item);

			function doOk(response) {
				$log.debug("--- eliminar pedido response ",response.data);
				 
				ToastCommons.mensaje("Eliminado !");
			}
			
			function doNoOk(response) {
				$log.debug("--- eliminar pedido response ",response.data);
				 
				ToastCommons.mensaje("error");
			}
			var params = {};
			params.idPedido = vm.pedido.id;
			params.idVariante = item.idVariante;
			params.cantidad = item.cantidad;
			 
			restProxy.put(CTE_REST.quitarProductoIndividual,params,doOk,doNoOk);
		}
		
		vm.cancelar = function (event){
			$log.debug('DetallePedidoController , cancelar', $scope.pedido);
			function doOk(response) {
				$log.debug("--- cancelar pedido response ",response.data);
				 
				ToastCommons.mensaje("Cancelado !");
			}
			
			function doNoOk(response) {
				$log.debug("--- cancelar pedido response ",response.data);
				 
				ToastCommons.mensaje("error");
			}
			
			restProxy.delete(CTE_REST.cancelarPedidoIndividual(vm.pedido.id),{},doOk,doNoOk);
		}
		
		 function callConfirmar(){
			$log.debug('callConfirmar   ', $scope.pedido);		
			function doOk(response) {
				$log.debug("--- confirmar pedido response ",response.data);
				 
				ToastCommons.mensaje("Pedido Confirmado !");
			}
			
			function doNoOk(response) {
				$log.debug("--- confirmar pedido response ",response.data);
				 
				ToastCommons.mensaje("error");
			}
			
			var params={};
			params.idPedido=vm.pedido.id;
			params.idDireccion = vm.direccionSelected.idDireccion;
	
			restProxy.post(CTE_REST.confirmarPedidoIndividual,params,doOk,doNoOk);
	
		}
 
		vm.confirmarDomicilio = function() {
			 $log.debug('close');
			 $mdDialog.hide();
			 callConfirmar();
		};
		 
		vm.confirmar = function(ev) {
			popUpElegirDireccion(ev);			
		};
		  
		vm.callDirecciones = function () {
				$log.debug('call direcciones ');
			 
				function doOk(response) {
					$log.debug('call direcciones response ',response);
					vm.direcciones = response.data;
					//abre pop
				}

				restProxy.getPrivate(CTE_REST.verDirecciones, {}, doOk);

		 }
		 
		 function popUpElegirDireccion(ev){
			 $log.debug('confirmarDomicilioOpenDialog');
			    $mdDialog.show({
			        templateUrl: 'dialog-direccion.html',
			        scope: $scope,
			        preserveScope: true,
			        targetEvent: ev
			      });
		 }
	}

})();
