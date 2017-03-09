(function() {
	'use strict';

	angular.module('chasqui').service('perfilService', perfilService);
	function perfilService($log,CTE_REST,StateCommons,promiseService ) {
		var vm = this;		

		vm.verDirecciones = function () {
			$log.debug(" service verDirecciones ");			
	        return promiseService.doGetPrivate(CTE_REST.verDirecciones, {});
	    }
	
		vm.notificacionesNoLeidas = function () {
			$log.debug(" service notificacionesNoLeidas ");			
	        return promiseService.doGetPrivate(CTE_REST.notificacionesNoLeidas, {});
	    }
		
		vm.notificacionesLeidas = function (cantidad) {
			$log.debug(" service notificacionesLeidas ");			
	        return promiseService.doGetPrivate(CTE_REST.notificacionesLeidas(cantidad), {});
	    }
		
		vm.notificacionesLeidas = function (id) {
			$log.debug(" service notificacionesLeidas ");			
	        return promiseService.doGetPrivate(CTE_REST.notificacionesLeidas(id), {});
	    }
		
		vm.marcarComoLeido = function (id) {
			$log.debug(" service marcarComoLeido ");			
	        return promiseService.doPost(CTE_REST.notificacionesLeidas(id), {});
	    }
		
		vm.cambiarPass = function (pass) {
			$log.debug(" service cambiarPass ");
			var params = {};
			params.password =pass;
	        return promiseService.doPut(CTE_REST.editUsuario,params);
	    }
		
		///////////////////////////////
		/////////// MOCKS 
		vm.gruposByusuario = function () {
			$log.debug(" service gruposByusuario ");
	        return promiseService.doGet(CTE_REST.gruposByusuario(StateCommons.vendedor().id),{});
	    }
		
		vm.salirGrupo = function (id, idSelect) {
			$log.debug(" service salirGrupo ");
	        return promiseService.doGet(CTE_REST.salirGrupo(id,idSelect),{});
	    }
		
	//	restProxy.get(CTE_REST.salirGrupo(), {}, doOk);
	//	restProxy.get(CTE_REST.gruposByusuario(StateCommons.vendedor().id),
		
	 
	}// function
})();// anonimo