(function(){
	'use strict';
	angular.module('chasqui').factory('factoryNuevoPedido', function($log,$state,$scope,restProxy, CTE_REST,StateCommons,ToastCommons){
		var vm = this;
		

		var nombre = function(){
			$log.debug("ver medalla",medalla);
			
		}

		var crearPedido = function(){
			function doNoOk(response) {
				$log.debug("--- callPedidoIndividual  response",response.data.error);
				ToastCommons.mensaje(response.data.error);
				 
			}
			function doOk(response) {
				$log.debug("--- crear pedido individual response ",response.data);
				 
				ToastCommons.mensaje("Pedido creado ! ");
			}
			
			restProxy.post(CTE_REST.crearPedidoIndividual, {},doOk,doNoOk);
		}

		

		var callPedidoIndividual = function(){
			function doOk(response) {
				//TODO: ver si lo puede traer el servicio
				response.data.creador = 'INDIVIDUAL'
				response.data.nombre = 'INDIVIDUAL'
				this.tabs.push(response.data);
				
			}
			
			function doNoOk(response) {
				$log.debug("--- callPedidoIndividual ",response.data);
				
				if (response.status==404){
					ToastCommons.mensaje("Noy  hay pedidos !");
				}else{
					ToastCommons.mensaje("algo fallo !");
				}
			}
			
			restProxy.getPrivate(CTE_REST.verPedidoIndividual(StateCommons.vendedor().id),{},doOk,doNoOk);
		
		}


		return {


			

		 	nuevoPedido: function(){

			crearPedido();
		 	callPedidoIndividual() }


		


			   }; //return







			}// factory function
)})();