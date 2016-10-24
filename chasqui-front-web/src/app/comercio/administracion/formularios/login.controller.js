(function() {
	'use strict';

	angular.module('chasqui').controller('LogInController', LogInController);

	/** @ngInject */
	function LogInController($scope, $http, $log, CTE_REST, restProxy,$mdDialog,$state
			,StateCommons,ToastCommons) {
		$log.debug('controler log in ..... ');

		var vm = this
		vm.user = {};

		
		vm.nuevo = function() {
			$log.debug('Log In nuevo user');
	
			$state.go("registro");
		
		}
		
		
		vm.recuperar = function(ev) {
		    // Appending dialog to document.body to cover sidenav in docs app
		    var confirm = $mdDialog.prompt()
		      .title('Recuperar contrasenia')
		      .textContent('Enviaremos instrucciones a tu correo')
		      .placeholder('correo')
		      //.ariaLabel('Dog name')
		      //.initialValue('Buddy')
		      //.targetEvent(ev)
		      .ok('Enviar')
		      .cancel('Cancelar');
		    $mdDialog.show(confirm).then(function(result) {
		    	$log.debug('Ingreso Correo ' + result + '.');
		    	vm.callReset(result);
		      
		    }, function() {
		    	$log.debug('Cancelo correo');
		    });
		  };
		  
		  
		  /////// REST
		  
		  vm.login = function() {
				$log.debug('Log In ', vm.user);
				// TODO NO OK , que vuelva a donde vino
				function doOk(response,headers) {
					$log.debug('response login ', response);
					
					StateCommons.ls.usuario = response.data;
					
					ToastCommons.mensaje("Bienvenido !");
					
					$state.go("principal");
					
				}
				
				function doNoOk(response,headers) {
					ToastCommons.mensaje("Fallo la autenticación, <br>verifique los datos");
				}
				

				restProxy.postPublic(CTE_REST.login, vm.user, doOk,doNoOk);

		 }
		  
		  vm.callReset = function(email) {
				
				
				function doOk(response) {					
					ToastCommons.mensaje("Revisa tu correo !");	
				}
				
				function doNoOk(response) {				
					$log.debug('response reset pass ', response);
					ToastCommons.mensaje("Error , el mail es correcto ?");	
				}
				
			 	restProxy.get(CTE_REST.resetPass(email),{} , doOk,doNoOk);

		 }
		  
		  
	}
})();
