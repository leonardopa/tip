(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('EmprenController',EmprenController);

  /** @ngInject */
  function EmprenController( $log,$stateParams,restProxy, CTE_REST,$state,StateCommons) {
	  $log.debug('EmprenController ..... ',$stateParams.id); 
	  StateCommons.ls.itemMenuSelect = 'emprendedores'; 
	   var vm = this
	   
	   vm.urlBase=CTE_REST.url_base;
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

			function doOk(response) {
				$log.debug("---callEmprendedor ---",response.data);
				//vm.categorias = response.data;
				
				vm.emprendedores= response.data;
			}
			// TODO: hacer el ID de VENDEDOR dinamico
			// PASARLE el id del producto vm.idEmprendedor
			//restProxy.get(CTE_REST.productores(CTE_REST.vendedor),{},doOk);	
                          restProxy.get(CTE_REST.productores(6),{},doOk);		    
	   }
	   
	   
	   
	   ///// TODO: en realidad deberia venir dentro del productor
	   function callMedallas() {
			$log.debug("---callMedallas ---");

			function doOk(response) {				 
				vm.medallas = response.data;
		//		vm.productorSelect =vm.productores[0]; 
			}
			
			// TODO: hacer el ID de VENDEDOR dinamico
			restProxy.get(CTE_REST.medallas,{},doOk);		    
	  }
	   

	   callEmprendedores();
  
  }
})();
