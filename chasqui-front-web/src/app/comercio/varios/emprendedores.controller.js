(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('EmprenController',EmprenController);

  /** @ngInject */
  function EmprenController( $log,$stateParams,restProxy, CTE_REST,$state,StateCommons,productorService,ToastCommons) {
	  $log.debug('EmprenController ..... ',$stateParams.id); 
	  StateCommons.ls.itemMenuSelect = 'emprendedores'; 
	   var vm = this
	   
	   vm.urlBase = CTE_REST.url_base;
	   vm.idEmprendedor = $stateParams.id;
	   vm.isCollapsed = true;
	   
	   vm.emprendedor;
	   vm.emprendedores;
	   vm.isVistaUnica=false;
	   
	   ///////////////// Eventos
	   
	   vm.verMas=function (item){
		   $log.debug("---ver mas ---",item);
		   
		   vm.emprendedor= item;
		   vm.medallas=[item.medalla];
		   vm.isVistaUnica=true;
	   }
	   
	   /////////////////
	   
	  
	   
	   function callEmprendedores() {
			$log.debug("---callEmprendedor ---");
			
			productorService.getProductores()
		        .then(function(data) {vm.emprendedores=data.data;})
		        .catch(function(err) {ToastCommons.mensaje(err.data.error);});
	   }
	   
	   
	   callEmprendedores();
  
  }
})();
