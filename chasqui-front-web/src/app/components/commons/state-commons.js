(function() {
  'use strict';
  
  angular.module('chasqui').service('StateCommons', StateCommons);
  function StateCommons($localStorage,$log,utilsService) {
	$log.debug('INIT localstorage',$localStorage);
	$log.debug('localstorage',$localStorage.token);
	$log.debug('localstorage',$localStorage.usuario);
	$log.debug('localstorage',$localStorage.pedidoSeleccionado);
	
    var vm = this;
    vm.ls = $localStorage;

    vm.ls.token;
    
    vm.ls.usuario ;
    
    vm.ls.pedidoSeleccionado; 

    vm.ls.varianteSeleccionada; 

    vm.ls.notificacionActiva;
    
    vm.isLogued= function(){
      return !(utilsService.isUndefinedOrNull(vm.ls.usuario) || utilsService.isUndefinedOrNull(vm.ls.usuario.token));
    }

    vm.vendedor = function(){
    	//TODO: pedir al servicio, hacer singleton con el LS
    	var config={};
    	config.id=5;
    	config.imagen="/imagenes/usuarios/adminpds/puentedelsur.png";
    	 
    	
    	return config;
    } 

  }// function
})();// anonimo