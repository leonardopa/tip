(function() {
	'use strict';

	angular.module('chasqui').controller('PerfilController',
			PerfilController);

	/** @ngInject . Pantalla de perfil de usuario*/
	function PerfilController($http, $log, $scope) {
		$log.debug("Init PerfilController ....");
		
		var vm = this;
		
		vm.a=function (){
			$log.debug("aaaaaaaa");
		}
		
	}

})();
