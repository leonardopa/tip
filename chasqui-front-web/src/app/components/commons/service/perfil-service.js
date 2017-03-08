(function() {
	'use strict';

	angular.module('chasqui').service('perfilService', perfilService);
	function perfilService($log,CTE_REST,StateCommons,promiseService ) {
		var vm = this;		

		vm.verDirecciones = function (params) {
			$log.debug(" service verDirecciones ");
			
	        return promiseService.doGetPrivate(CTE_REST.verDirecciones, {});
	    }
	
	}// function
})();// anonimo