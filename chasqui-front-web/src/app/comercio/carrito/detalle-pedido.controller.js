(function() {
	'use strict';

	angular.module('chasqui').controller('DetallePedidoController',
			DetallePedidoController);

	/** @ngInject */
	function DetallePedidoController($http, $log,$state,$scope,restProxy, CTE_REST,ToastCommons ) {
		$log.debug('DetallePedidoController ..... ', $scope.pedido);
		
		var vm = this;
		vm.pedido = $scope.pedido;
		vm.urlBase=CTE_REST.url_base;
		
		vm.comprar = function (event){
			$log.debug('DetallePedidoController , modo comprar ', $scope.pedido);
			$state.go('catalogo')
		}
		  
		vm.eliminar = function (event){
			$log.debug('DetallePedidoController , eliminar ', $scope.pedido);
			function doOk(response) {
				$log.debug("--- eliminar pedido response ",response.data);
				 
				ToastCommons.mensaje("Eliminado !");
			}
			
			function doNoOk(response) {
				$log.debug("--- eliminar pedido response ",response.data);
				 
				ToastCommons.mensaje("error");
			}
			
			restProxy.delete(CTE_REST.agregarPedidoIndividual,{},doOk,doNoOk);
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
			
			restProxy.delete(CTE_REST.pedidoIndividual(vm.pedido.id),{},doOk,doNoOk);
		}
		
		vm.confirmar = function (event){
			$log.debug('DetallePedidoController ,confirmar ', $scope.pedido);
			
			function doOk(response) {
				$log.debug("--- confirmar pedido response ",response.data);
				 
				ToastCommons.mensaje("Pedido Confirmado !");
			}
			
			function doNoOk(response) {
				$log.debug("--- confirmar pedido response ",response.data);
				 
				ToastCommons.mensaje("error");
			}
			
			restProxy.put(CTE_REST.pedidoIndividual(vm.pedido.id),{},doOk,doNoOk);
	
		}
	
	}

})();
