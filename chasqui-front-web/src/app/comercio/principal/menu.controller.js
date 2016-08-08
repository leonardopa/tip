(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('MenuController',MenuController);

  /** @ngInject */
  function MenuController( $scope,$log,$state) {
	  $log.debug("MenuController ..... ");
	  
	  var vm = this;

	  vm.hello = "MenuController ...  hello";
	 
	  vm.categorias=[];
		 
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
