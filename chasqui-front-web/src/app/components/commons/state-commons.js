(function() {
  'use strict';
  
  angular.module('chasqui').service('StateCommons', StateCommons);
  function StateCommons($localStorage,$log) {
	$log.debug('INIT localstorage',$localStorage);
	$log.debug('localstorage',$localStorage.token);
	$log.debug('localstorage',$localStorage.usuario);
	$log.debug('localstorage',$localStorage.pedidoSeleccionado);
	
    var vm = this;
    vm.ls = $localStorage;

    vm.ls.token;
    
    vm.ls.usuario ;
    
    vm.ls.pedidoSeleccionado;
    
    vm.ls.notificacionesSinLeer;
    vm.ls.callNotificaciones=false;
	vm.ls.icon='notifications_none';
	vm.ls.fill='white';

    vm.vendedor = function(){
    	//TODO: pedir al servicio, hacer singleton con el LS
    	var config={};
    	config.id=5;
    	config.imagen="/imagenes/usuarios/adminpds/puentedelsur.png";
    	 
    	
    	return config;
    } 

  }// function
})();// anonimo