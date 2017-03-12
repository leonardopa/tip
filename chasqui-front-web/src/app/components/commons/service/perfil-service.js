(function() {
	'use strict';

	angular.module('chasqui').service('perfilService', perfilService);
	function perfilService($log,CTE_REST,StateCommons,promiseService ) {
		var vm = this;		

		vm.verDirecciones = function () {
			$log.debug(" service verDirecciones ");			
	        return promiseService.doGetPrivate(CTE_REST.verDirecciones, {});
	    }
		
		vm.actualizarDireccion = function (direccion) {
			$log.debug(" service actualizarDireccion ");			
	        return promiseService.doPut(CTE_REST.actualizarDireccion, direccion);
	    }
		
		vm.eliminarDireccion = function (id) {
			$log.debug(" service eliminarDireccion ");			
	        return promiseService.doDelete(CTE_REST.eliminarDireccion(id), {});
	    }
		
		vm.nuevaDireccion = function (domicilio) {
			$log.debug(" service nuevaDireccion ");			
	        return promiseService.doPost(CTE_REST.nuevaDireccion, domicilio);
	    }
		
		vm.actualizarDireccion = function (domicilio) {
			$log.debug(" service actualizarDireccion ");			
	        return promiseService.doPut(CTE_REST.actualizarDireccion, domicilio);
	    }
		//restProxy.put(CTE_REST.actualizarDireccion,vm.domicilio,doOk);
		//restProxy.post(CTE_REST.nuevaDireccion,vm.domicilio,doOk);
		//restProxy.delete(CTE_REST.eliminarDireccion(vm.domicilio.idDireccion),{},doOk);
		//restProxy.put(CTE_REST.actualizarDireccion,vm.domicilioParam,doOk);
		
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
		
		vm.login = function (user) {
			$log.debug(" service login ");
	        return promiseService.doPostPublic(CTE_REST.login,user);
	    }
		
		vm.resetPass = function (user) {
			$log.debug(" service resetPass ");
	        return promiseService.doGet(CTE_REST.resetPass(email), {});
	    }
		
		vm.verUsuario = function () {
			$log.debug(" service verUsuario ");
	        return promiseService.doGetPrivate(CTE_REST.verUsuario, {});
	    }
		
		vm.editUsuario = function (user) {
			$log.debug(" service editUsuario ");
	        return promiseService.doPut(CTE_REST.editUsuario, user);
	    }

		vm.singUp = function (user) {
			$log.debug(" service singUp ");
	        return promiseService.doPostPublic(CTE_REST.singUp, user);
	    }
	 
		///////////////////////////////
		/////////// MOCKS 
		vm.gruposByusuario = function () {
			$log.debug(" service gruposByusuario ");
	        return promiseService.doGet(CTE_REST.gruposByusuario(StateCommons.vendedor().id),{});
	    }
		
		
		vm.gruposByusuarioSave = function (id, contacts) {
			$log.debug(" service gruposByusuario ");
	        return promiseService.doPost(CTE_REST.gruposByusuario(id),contacts);
	    }
		
		vm.salirGrupo = function (id, idSelect) {
			$log.debug(" service salirGrupo ");
	        return promiseService.doGet(CTE_REST.salirGrupo(id,idSelect),{});
	    }
		
		vm.integrantesGrupo = function (id, contacts) {
			$log.debug(" service integrantesGrupo ");
	        return promiseService.doGet(CTE_REST.integrantesGrupo(id),contacts);
	    }
		
		vm.direccionGrupo = function (id, direccion) {
			$log.debug(" service direccionGrupo ");
	        return promiseService.doPost(CTE_REST.direccionGrupo(id),direccion);
	    }
	
	//	restProxy.post(CTE_REST.direccionGrupo(1),vm.domicilio,doOk);
	//	restProxy.post(CTE_REST.gruposByusuario(1), vm.grupo, doOk);
	//	restProxy.post(CTE_REST.integrantesGrupo(vm.idGrupo), vm.contacts,		doOk);
	//	restProxy.get(CTE_REST.salirGrupo(), {}, doOk);
	//	restProxy.get(CTE_REST.gruposByusuario(StateCommons.vendedor().id),
		
	 
	}// function
})();// anonimo