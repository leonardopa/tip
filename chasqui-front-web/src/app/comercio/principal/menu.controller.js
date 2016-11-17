(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('MenuController',MenuController);

  /** @ngInject */
  function MenuController( $scope,$log,$state,StateCommons,CTE_REST) {
	  $log.debug("MenuController ..... ");
	  $log.debug(StateCommons.ls.usuario);
	  
	  var vm = this;
	  vm.urlBase = CTE_REST.url_base;
	  vm.vendedor=StateCommons.vendedor();
	 
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
	  var count = 0;
	  
	  vm.classFor = function (page){
	//	  $log.debug("classForclassForclassForclassForclassForclassForclassFor ",page);
	//	  $log.debug("classForclassForclassForclassForclassForclassForclassFor ", StateCommons.ls.itemMenuSelect);
		  count++;
	//	  $log.debug("classForclassForclassForclassForclassForclassForclassFor ", count);
		  if (StateCommons.ls.itemMenuSelect == page) return "md-accent";
		  
		  return "";
	  }
	  
	  vm.logOut = function (){
		  $log.debug("Log Out ..... ");
		  StateCommons.ls.usuario={};
		  StateCommons.ls.token=null;
		  StateCommons.ls.pedidoSeleccionado=null;
		  $state.go('principal')
	  }



      

  }
})();
