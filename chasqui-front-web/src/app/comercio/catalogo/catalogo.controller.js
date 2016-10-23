(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('CatalogoController',CatalogoController);

  /** @ngInject */
  function CatalogoController( $scope,$log,restProxy, CTE_REST, $timeout,StateCommons) {
	  $log.debug("CatalogoController ..... ",StateCommons.ls.pedidoSeleccionado);
	  
	  var vm = this;
	  
	  
	  /////////// Para el selector de Grupos de compra
	  vm.topDirections = ['left', 'up'];
	  vm.bottomDirections = ['down', 'right'];
	  vm.isOpen = false;
	  vm.availableModes = ['md-fling', 'md-scale'];
	  vm.selectedMode = 'md-fling'; ///md-scale
	  vm.availableDirections = ['up', 'down', 'left', 'right'];
	  vm.selectedDirection = 'up';
	  
//	  vm.categorias = ['categorias 1', 'categorias 2 ', 'categorias 3', 'categorias 4'];
	  vm.categorias =[];	 
	  vm.productores = [];
	  vm.medallas = [];
	  vm.query=''; 
	  
	  vm.pedidos={};
	  vm.carrito=StateCommons.ls.pedidoSeleccionado;
	  vm.size=24;
	  vm.icon='shopping_cart';
	  vm.options={'rotation': 'circ-in' , 'duration': 1000 };
	  
	  vm.paginaProducto;	  
	  vm.tipoFiltro='CATEGORIA';// PRODUCTOR / MEDALLA / QUERY
	  vm.queryText;
	  vm.categoriaSelect;
	  vm.productorSelect;
	  vm.medallaSelect;
	  
	  
	  
	  vm.filtroPor = function(filtroPor){
		  $log.debug("filtro por ",filtroPor);
		  
		  vm.tipoFiltro = filtroPor;
		 /// eliminar los otros selects
		  switch (filtroPor) {
	          case 'PRODUCTOR':
	        	  vm.queryText=null;
	        	  vm.categoriaSelect=null;        	  
	        	  vm.medallaSelect=null;
	              break;
	          case 'MEDALLA':
	        	  vm.queryText=null;
	        	  vm.categoriaSelect=null;
	        	  vm.productorSelect=null;
	              break;
	          case 'CATEGORIA':
	        	  vm.queryText=null;
	        	  vm.productorSelect=null;
	        	  vm.medallaSelect=null;
	              break;
	          default:
		  }
		  
		  vm.filtrar();
	  }
	  
	  vm.filtroQuery = function(){
		  vm.tipoFiltro = 'QUERY';
		  
		  vm.categoriaSelect=null;
		  vm.productorSelect=null;
		  vm.medallaSelect=null;
		  doFiltrar(vm.queryText);
	  }
	  
	  vm.filtrar = function (){	  	  
		  switch (vm.tipoFiltro) {
	          case 'PRODUCTOR':
	        	  doFiltrar(vm.productorSelect);
	              break;
	          case 'MEDALLA':
	        	  doFiltrar(vm.medallaSelect);
	              break;
	          case 'CATEGORIA':
	        	  doFiltrar(vm.categoriaSelect);
	              break;
	          case 'QUERY':
	        	  doFiltrar(vm.queryText);
	              break;
	          default:
		  }
	 
	  }
	  

	  
	  vm.cambiarContexto = function (pedido){
		  $log.debug("cambia contexo de carrito ",pedido);
		  
		  vm.carrito=pedido;
		  StateCommons.ls.pedidoSeleccionado = vm.carrito;
		  
		  vm.icon=pedido.icon;
			//  vm.icon='shopping_cart';			  
			  $timeout(function() {
				  vm.icon='shopping_cart';
				  ///vm.icon=pedido.icon;
			  }, 1500);

	  }
	  
	  var doFiltrar = function (valor){
		  var filtro = {};
		  filtro.tipo = vm.tipoFiltro;
		  filtro.valor = valor;			 
		  $scope.$broadcast('filterEvent', filtro);	// llama al evento del list-producto-controller	 
	  }
	  
	  /// CALL REST 
	  
	  //TODO: cache , para no sobrecargar con grupos
	  function callLoadGrupos() {
			$log.debug("--- find  pedidos abiertos ---");

			function doOk(response) {
				 
				vm.pedidos = response.data;
				

				angular.forEach(vm.pedidos, function(pedido) {
					$log.debug(pedido.tipo );
					pedido.icon = 'people';
					pedido.icon = pedido.tipo == 'INDIVIDUAL' ? 'person' : pedido.icon ;
					pedido.icon = pedido.tipo == 'NODOS' ? 'people_outline' : pedido.icon ;
					
				});

				if (vm.carrito !=null){
					//vm.carrito = vm.pedidos[0];
					vm.carrito = StateCommons.ls.pedidoSeleccionado;					
				}else{
					vm.carrito = vm.pedidos[0];
				}
			}
			
			// TODO: hacer el ID de usuario dinamico
			restProxy.get(CTE_REST.productosPedidoByUser(6),{},doOk);		    
	 }
	 
	  
	  function callCategorias() {
			$log.debug("---callCategorias ---");

			function doOk(response) {
				 
				vm.categorias = response.data;
				vm.categoriaSelect =vm.categorias[0]; 
			}
			
			// TODO: hacer el ID de VENDEDOR dinamico
			restProxy.get(CTE_REST.categorias(CTE_REST.vendedor),{},doOk);		    
	 }
	  
	  function callProductores() {
			$log.debug("---callProductores ---");

			function doOk(response) {				 
				vm.productores = response.data;
		//		vm.productorSelect =vm.productores[0]; 
			}
			
			// TODO: hacer el ID de VENDEDOR dinamico
			restProxy.get(CTE_REST.productores(CTE_REST.vendedor),{},doOk);		    
	 }
	  
	  function callMedallas() {
			$log.debug("---callMedallas ---");

			function doOk(response) {				 
				vm.medallas = response.data;
			}
		
			restProxy.get(CTE_REST.medallas,{},doOk);		    
	 }
	  
	 
	 
	 callLoadGrupos();
	 callCategorias();
	 callProductores();
	 callMedallas(); 
	    
	
  }
})();
