(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('MedallaController',MedallaController);

  /** @ngInject */
  function MedallaController( $log,$stateParams,restProxy, CTE_REST,$state) {
	  $log.debug('MedallaController ..... ',$stateParams.idMedalla); 
	   var vm = this
	   
	   
	   vm.idMedalla = $stateParams.idMedalla;
	   vm.medalla;
	   vm.medallas;
	   vm.isVistaUnica=false;
	   
	   if(vm.idMedalla){
		   vm.isVistaUnica=true;
	   }
	   
	   vm.verMas=function (item){
		   $log.debug("---ver mas ---",item);
		   
		   $state.go('emprendedores', {
		        id: item.idVendedor
		      });
	   }
	   
	   /////////////////
	   
	  
	 
	   
	   ///// TODO: en realidad deberia venir dentro del productor
	   function callMedallas() {
			$log.debug("---callMedallas ---");

			function doOk(response) {				 
				vm.medallas = response.data;
				vm.medalla = response.data[0]; 
			}
			
			// TODO: hacer el ID de VENDEDOR dinamico
			restProxy.get(CTE_REST.medallas,{},doOk);		    
	  }
	   
	   /////////////////
	   
	   

	  callMedallas();
	
	   
	   
	   
	   
  }
})();
