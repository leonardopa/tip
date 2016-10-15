(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('EmprenController',EmprenController);

  /** @ngInject */
  function EmprenController( $log,$stateParams,restProxy, CTE_REST,$state) {
	  $log.debug('EmprenController ..... ',$stateParams.id); 
	   var vm = this
	   
	   
	   vm.idEmprendedor = $stateParams.id;
	   vm.isCollapsed = true;
	   
	   vm.emprendedor;
	   vm.emprendedores;
	   vm.isVistaUnica=false;
	   
	   ///////////////// Eventos
	   
	   vm.verMas=function (item){
		   $log.debug("---ver mas ---",item);
		   
		   $state.go('emprendedores', {
		        id: item.idVendedor
		      });
	   }
	   
	   /////////////////
	   
	    function callEmprendedor() {
			$log.debug("---callEmprendedor ---");

			function doOk(response) {
				$log.debug("---callEmprendedor ---",response.data);
				//vm.categorias = response.data;
				
				vm.emprendedor= response.data[0]; // TODO: falta productor por ID
			}
			// TODO: hacer el ID de VENDEDOR dinamico
			// PASARLE el id del producto vm.idEmprendedor
			restProxy.get(CTE_REST.productores(1),{},doOk);		    
	   }
	   
	   function callEmprendedores() {
			$log.debug("---callEmprendedor ---");

			function doOk(response) {
				$log.debug("---callEmprendedor ---",response.data);
				//vm.categorias = response.data;
				
				vm.emprendedores= response.data;
			}
			// TODO: hacer el ID de VENDEDOR dinamico
			// PASARLE el id del producto vm.idEmprendedor
			restProxy.get(CTE_REST.productores(1),{},doOk);		    
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
	   
	   /////////////////
	   
	   
	   if(vm.idEmprendedor){		   
		   callEmprendedor();
		   callMedallas();
		   vm.isVistaUnica=true;
	   }else{
		   //$log.error("no llego el parametro id emprendedor");
		   callEmprendedores();
	   }
	   
	   
	   
	   
	   
  }
})();
