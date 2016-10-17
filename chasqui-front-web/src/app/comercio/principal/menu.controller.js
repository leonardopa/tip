(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('MenuController',MenuController);

  /** @ngInject */
  function MenuController( $scope,$log,$state,StateCommons) {
	  $log.debug("MenuController ..... ");
	  $log.debug(StateCommons.ls.usuario);
	  
	  var vm = this;

	 
	 
	  vm.categorias=[];
	  vm.usuario= StateCommons.ls.usuario;
	  vm.isLogued = ! angular.equals(StateCommons.ls.usuario, {}); 
	  
	  vm.ir = function (page){
		  $log.debug("ir a ..... ",page);
		  
		  switch (page) { 
          case 'como-comprar':
              $state.go('como-comprar')
              break;
          case 'catalogo':
              $state.go('catalogo')
              break;
          case 'emprendedores':
              $state.go('emprendedores')
              break;
          case 'medalla':
              $state.go('medalla')
              break;
          case 'lista-pedidos':
              $state.go('lista-pedidos')
              break;
          case 'lista-grupos':             
              $state.go('lista-grupos')
              break;
          case 'perfil':             
              $state.go('perfil')
              break;
          case 'login':              
              $state.go('login')
              break;
          default:

          }
		  
		  
	  }
	  
 
  }
})();
