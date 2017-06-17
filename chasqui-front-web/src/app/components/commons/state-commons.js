(function() {
  'use strict';
  
  angular.module('chasqui').service('StateCommons', StateCommons);
  function StateCommons($localStorage,$log,utilsService) {
	$log.debug('INIT localstorage',$localStorage);
	$log.debug('localstorage',$localStorage.token);
	$log.debug('localstorage',$localStorage.usuario);
	$log.debug('localstorage',$localStorage.pedidoSelected);
	
    var vm = this;
    vm.ls = $localStorage;

    vm.ls.token; 
    vm.ls.usuario ;
    vm.ls.grupoSelected;
    vm.ls.pedidoSelected; 
    vm.ls.varianteSelected; 
    vm.ls.notificacionActiva=false;
    
    vm.isLogued= function(){
      return !(utilsService.isUndefinedOrNull(vm.ls.usuario) || utilsService.isUndefinedOrNull(vm.ls.usuario.token));
    }

    vm.isGrupoIndividualSelected=function(){
        return utilsService.isUndefinedOrNull(vm.ls.grupoSelected)  || vm.ls.grupoSelected.alias =='Personal';
    }
    vm.isPedidoInividualSelected=function(){         
        return vm.ls.pedidoSelected.idGrupo == null;
    }
    

    vm.logOut=function(){
      vm.ls.token=undefined;
      vm.ls.usuario={};
      vm.ls.grupoSelected=undefined;
      vm.ls.pedidoSelected=undefined; 
      vm.ls.varianteSelected=undefined; 
      vm.ls.notificacionActiva=false;
    }

    vm.vendedor = function(){
    	//TODO: pedir al servicio, hacer singleton con el LS
    	var config={};
    	config.id=2;
    	config.imagen="/imagenes/usuarios/adminpds/puentedelsur.png";
    	 
    	
    	return config;
    } 

  }// function
})();// anonimo