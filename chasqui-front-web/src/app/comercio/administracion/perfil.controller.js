(function() {
	'use strict';

	angular.module('chasqui').controller('PerfilController',
			PerfilController);

	/** @ngInject . Pantalla de perfil de usuario*/
	function PerfilController($http, $log, $scope,CTE_REST, restProxy,StateCommons ,$mdDialog
			,ToastCommons) {
		$log.debug("Init PerfilController ....");
		StateCommons.ls.itemMenuSelect = 'perfil'; 
		var vm = this;
		
		vm.direcciones;
		vm.pass1="";
		vm.pass2="";
		
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
		 
		 var showPrerenderedDialog = function(ev) {
			    $mdDialog.show({
			        controller: PerfilController,
			        contentElement: '#myDialog',
			        parent: angular.element(document.body),
			        targetEvent: ev,
			        clickOutsideToClose: true
			      });
			    };
		 
	     vm.cambiarPassConfirmar = function (){
	    	 $log.debug('call direcciones response ',vm.pass1);
	    	 if (vm.pass1!='' && (vm.pass1 === vm.pass2)){
	    		 callCambiarPass();
	    		 $mdDialog.cancel();
	    	 }else{
	    		 ToastCommons.mensaje("Las contraseñas deben ser iguales !");
	    	 }
	     }
	     
		 vm.cambiarPass=function(){
			 $log.debug('cambiar pass', StateCommons.ls.usuario);
			 showPrerenderedDialog();
		 }
		 
		var callCambiarPass = function(){
			 	function doOk(response) {
			 		ToastCommons.mensaje('Contraseña actualizada');
				}
			 	
				function doNoOk(response) {
					 ToastCommons.mensaje(response.data);
				}
				
				var params={};
				params.password=vm.pass1;
				restProxy.put(CTE_REST.editUsuario,params, doOk);

		 }
		 vm.callDirecciones()
	}

})();
