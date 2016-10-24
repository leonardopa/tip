(function() {
	'use strict';

	angular.module('chasqui').controller('RegistroController',
			RegistroController);

	/** @ngInject . Pantalla de registro de usuario. Contempla los datos personales y 
	 *  el domicilio en dos pasos pero en la misma pantalla*/
	function RegistroController($http, $log,$state,$scope) {
		$log.debug("Init RegistroController ....",$state.params.domicilio);
		
		///	$state.go("form-usuario",{ "domicilio" : vm.domicilio});
		//var isPasoDomicilio = $state.params.domicilio == true ;
		
		var vm = this;
		
		vm.isPasoUsuario = true
		vm.isPasoDomicilio = false
		
		/** Si ya cargo el usuario , ahora tiene que cargar el domicilo*/
		$scope.$on("creo-usuario-nuevo", function (args,mass) {
			$log.debug("llego el mensaje del otro controller ....",mass.user);
			//vm.isPasoUsuario = ! vm.isPasoUsuario;
			//vm.isPasoDomicilio = ! vm.isPasoDomicilio;
			$state.go('login');
		});
	}

})();
