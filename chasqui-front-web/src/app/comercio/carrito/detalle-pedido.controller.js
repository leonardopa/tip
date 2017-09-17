(function() {
	'use strict';

	angular.module('chasqui').controller('DetallePedidoController',
		DetallePedidoController);

	/** @ngInject */
	function DetallePedidoController($log, $state, $scope, CTE_REST, ToastCommons, $mdDialog, dialogCommons, productoService, perfilService, gccService, StateCommons,
		contextoCompraService,us) {
		$log.debug('DetallePedidoController ..... ', $scope.pedido);

		var vm = this;
		vm.pedido = $scope.pedido;
		vm.urlBase = CTE_REST.url_base;
		vm.direcciones ;
		vm.direccionSelected;
		vm.productoEliminar;
		vm.isIndividual = vm.pedido.idGrupo == null;
		vm.isAdmin = contextoCompraService.isAdmin(vm.pedido);

		vm.comprar = function(event) {
			contextoCompraService.setContextoByPedido($scope.pedido);
			$state.go('catalogo')
		}


		function doEliminar() {
			$log.debug('DetallePedidoController , eliminar ', vm.productoEliminar);

			function doOk(response) {
				$log.debug("--- eliminar pedido response ", response.data);
				ToastCommons.mensaje(us.translate('QUITO_PRODUCTO'));
			//	contextoCompraService.refreshPedido();
				contextoCompraService.refreshPedidos().then(
			        function(pedidos) {
			          $state.reload();			          
			        });
				//$state.reload();
			}

			var params = {};
			params.idPedido = vm.pedido.id;
			params.idVariante = vm.productoEliminar.idVariante;
			params.cantidad = vm.productoEliminar.cantidad;

			productoService.quitarProductoIndividual(params).then(doOk)
		}

		vm.eliminar = function(item) {
			vm.productoEliminar = item;

			dialogCommons.confirm(us.translate('QUITAR_PRODUCTO_TIT'),
				us.translate('QUITAR_PRODUCTO_MSG'),
				us.translate('SI'),
				us.translate('NO'),
				doEliminar,
				function() {}
			);
		}

		vm.cancelar = function(event) {
			$log.debug('DetallePedidoController , cancelar', $scope.pedido);

			function doOk(response) {
				$log.debug("--- cancelar pedido response ", response.data);
				ToastCommons.mensaje(us.translate('CANCELADO'));
				contextoCompraService.refreshPedidos().then(
					function() {
						$state.reload();
					});

			}

			productoService.cancelarPedidoIndividual(vm.pedido.id).then(doOk);
		}
		/// confirmacion individual de GCC
		vm.confirmarPedidoIndividualGcc = function() {
			function doOk(response) {
				ToastCommons.mensaje(us.translate('PEDIDO_CONFIRMADO_MSG'));
				contextoCompraService.refreshPedidos().then(
					function() {						
						$state.reload();
					});				
			}

			if (vm.pedido.idGrupo == null) {
				ToastCommons.mensaje("funcionalidad para GCC !");
			} else {
				gccService.confirmarPedidoIndividualGcc(vm.pedido.id).then(doOk)
			}
		}

		function callConfirmar() {
			$log.debug('callConfirmar   ',vm.pedido);

			function doOk(response) {
				$log.debug("--- confirmar pedido response ", response.data);
				ToastCommons.mensaje(us.translate('PEDIDO_CONFIRMADO_MSG'));
				contextoCompraService.refreshPedidos().then(
			        function(pedidos) {
			          $state.reload();			          
			        });
			}

			if (vm.pedido.idGrupo == null) {
				var params = {};
				params.idPedido = vm.pedido.id;
				params.idDireccion = vm.direccionSelected.idDireccion;
				// logica por si es pedido grupañ
				productoService.confirmarPedidoIndividual(params).then(doOk)
			} else {
				gccService.confirmarPedidoColectivo(vm.pedido.idGrupo).then(doOk)
			}

		}

		vm.confirmarDomicilio = function() {
			$log.debug('close');
			$mdDialog.hide();
			callConfirmar();
		};

		vm.confirmar = function(ev) {
			//popUpElegirDireccion(ev);
			vm.callDirecciones();
		};

		vm.callDirecciones = function() {
			$log.debug('call direcciones ');

			function doOk(response) {
				$log.debug('call direcciones response ', response);
				vm.direcciones = response.data;

				if (vm.direcciones.length == 0){
					ToastCommons.mensaje(us.translate('PEDIR_DOMICILIO'));					
				}else{
					popUpElegirDireccion();
				}
			}

			perfilService.verDirecciones().then(doOk);
		}

		function popUpElegirDireccion(ev) {
			$log.debug('confirmarDomicilioOpenDialog');
			$mdDialog.show({
				templateUrl: 'dialog-direccion.html',
				scope: $scope,
				preserveScope: true
				//targetEvent: ev
			});
		}
	}

})();
