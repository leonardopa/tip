(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('EmprenController',EmprenController);

  /** @ngInject */
  function EmprenController( $log,$stateParams, CTE_REST,$state,StateCommons,productorService,ToastCommons
		  ,utilsService) {
	  $log.debug('EmprenController ..... ',$stateParams.id); 
	  StateCommons.ls.itemMenuSelect = 'emprendedores'; 
	   var vm = this
	   
	   vm.urlBase = CTE_REST.url_base;
	   vm.idEmprendedor = $stateParams.id;
	   vm.isCollapsed = true;
	   
	   vm.emprendedor;
	   vm.emprendedores;
	   vm.isVistaUnica=false;
	   
	   // /////////////// Eventos
	   
	   vm.verDetalle=function (item){
		   vm.emprendedor= item;
		   console.log(item.medalla)
		   console.log(angular.isUndefined(item.medalla))
		   if (!utilsService.isUndefinedOrNull(item.medalla)){
			   vm.medallas=[item.medalla];// Por alguna razon mandan una sola
											// medalla
		   }
		   vm.isVistaUnica=true;
	   }
	   
	   
	   vm.verMas=function (){
		   $log.debug("---ver mas ---");
		   
		   vm.emprendedor= undefined;
		   vm.medallas=[];
		   vm.isVistaUnica=false;
	   }
	   
	   // ///////////////
	   
	  
	   
	   function callEmprendedores() {
			$log.debug("---callEmprendedor ---");
			
			productorService.getProductores()
		        .then(function(data) {vm.emprendedores=data.data;})
	   }
	   
	   
	   callEmprendedores();
  
  }
})();
