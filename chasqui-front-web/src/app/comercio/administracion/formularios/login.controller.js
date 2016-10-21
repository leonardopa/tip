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
					
					/*
					var token = response.headers('authorization');
					
					if(token){
						StateCommons.ls.token = token;
						
						ToastCommons.mensaje("Bienvenido !");
						
						$state.go("principal");
						
					}else{
						$log.error('No se recibe token de autorizacion , se habilito desde el Back End? VER: http://stackoverflow.com/questions/23000273/how-to-read-response-headers-with-resource/23726352#23726352 ');
						$log.error('Log In ', response);
						 $state.go('error', {
						        key: 'GENERIC_ERROR'
						      });
					}
					*/
				}
				
				function doNoOk(response,headers) {
					ToastCommons.mensaje("Fallo la autenticación, <br>verifique los datos");
				}
				

				restProxy.postPublic(CTE_REST.login, vm.user, doOk,doNoOk);

		 }
		  
		  vm.callReset = function(email) {
				
				// TODO NO OK
				function doOk(response) {
					vm.variantes = response.data;
				}

				restProxy.post(CTE_REST.resetPass(email),{} , doOk);

		 }
		  
		  
	}
})();
