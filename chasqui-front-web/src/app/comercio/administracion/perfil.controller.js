(function() {
	'use strict';

	angular.module('chasqui').controller('PerfilController',
			PerfilController);

	/** @ngInject . Pantalla de perfil de usuario*/
	function PerfilController($http, $log, $scope,CTE_REST, restProxy,StateCommons ) {
		$log.debug("Init PerfilController ....");
		StateCommons.ls.itemMenuSelect = 'perfil'; 
		var vm = this;
		
		vm.direcciones;
		
		vm.addDireccion=function (){
			$log.debug("add direccion");
			vm.direcciones.push({alias: 'nueva'});
		}
		
		
		 vm.callDirecciones = function() {
				$log.debug('call direcciones ', vm.user);
				// TODO NO OK , que vuelva a donde vino
				function doOk(response) {
					$log.debug('call direcciones response ',response);
					vm.direcciones = response.data;
				}

				restProxy.getPrivate(CTE_REST.verDirecciones, {}, doOk);

		 }
		  
		 vm.callDirecciones()
	}

})();
