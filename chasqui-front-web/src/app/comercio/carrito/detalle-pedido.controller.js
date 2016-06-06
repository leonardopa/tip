(function() {
	'use strict';

	angular.module('chasqui').controller('DetallePedidoController',
			DetallePedidoController);

	/** @ngInject */
	function DetallePedidoController($http, $log,$state,$scope,restProxy, CTE_REST) {
		$log.debug('DetallePedidoController ..... ', $scope.pedido);
		
		var vm = this;
		vm.pedido = $scope.pedido;
		
		
		vm.comprar = function (event){
			$log.debug('DetallePedidoController , modo comprar ', $scope.pedido);
			$state.go('principal')
		}
		
	}

})();
