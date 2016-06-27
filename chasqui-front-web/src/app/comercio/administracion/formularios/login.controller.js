(function() {
	'use strict';

	angular.module('chasqui').controller('LogInController', LogInController);

	/** @ngInject */
	function LogInController($scope, $http, $log, CTE_REST, restProxy,$mdDialog,$state) {
		$log.debug('controler log in ..... ');

		var vm = this
		vm.user = {};

		
		vm.nuevo = function() {
			$log.debug('Log In nuevo user');
	
				
			$state.go("form-domicilio");
		
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
				function doOk(response) {
					$state.go("principal");
				}

				restProxy.post(CTE_REST.login, vm.user, doOk);

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
