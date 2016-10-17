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
    
    

  }// function
})();// anonimo