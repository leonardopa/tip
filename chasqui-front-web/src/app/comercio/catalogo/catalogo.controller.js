(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('CatalogoController',CatalogoController);

  /** Pagina donde se muestran los productos. Contiene los filtros y el contexto
   * de compra , pero NO la lista de productos la cual se incluye */
  function CatalogoController( $scope,$log,restProxy, CTE_REST, $timeout,StateCommons,productorService
		  ,productoService,ToastCommons) {
	  $log.debug("CatalogoController ..... ",StateCommons.ls.pedidoSeleccionado);
	  StateCommons.ls.itemMenuSelect = 'catalogo';
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
	  vm.sinFiltroSelect;
	  
	  vm.urlBase=CTE_REST.url_base;
 
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
	          vm.sinFiltroSelect=null;
		  }
		  
		  vm.filtrar();
	  }
	  
	  vm.filtroQuery = function(){
		  vm.tipoFiltro = 'QUERY';
		  
		  vm.categoriaSelect=null;
		  vm.productorSelect=null;
		  vm.medallaSelect=null;
		  vm.sinFiltroSelect=null;	
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
	          //Agregado 16/12
	          	  doFiltrar(vm.sinFiltroSelect);
	          	  break;
		  }
	 
	  }
	  
	  var doFiltrar = function (valor){
		  var filtro = {};
		  filtro.tipo = vm.tipoFiltro;
		  filtro.valor = valor;			 
		  $scope.$broadcast('filterEvent', filtro);	// llama al evento del list-producto-controller	 
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

	  /// CALL REST 
	  
	  //TODO: cache , para no sobrecargar con grupos
	  //TODO: implemantar cuante este funcionando grupos
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
			
			restProxy.get(CTE_REST.productosPedidoByUser(StateCommons.vendedor().id),{},doOk);		    

	 }
	 
	  
	  function callCategorias() {
		  productoService.getCategorias()
		  	.then(function(response) {
		  		vm.categorias = response.data;
				vm.categoriaSelect =vm.categorias[0]; 
		  	})
	        .catch(function(err) {ToastCommons.mensaje(err.data.error);});	
		    		    
	 }
	  
	  function callProductores() {
		  productorService.getProductores()
	        .then(function(response) {vm.productores=response.data;})
	        .catch(function(err) {ToastCommons.mensaje(err.data.error);});		  
	 }
	  
	  function callMedallas() {
		  productoService.getMedallas()
	        .then(function(response) {vm.medallas = response.data;})
	        .catch(function(err) {ToastCommons.mensaje(err.data.error);});
	    
	 }
 
	 
	 callLoadGrupos();
	 callCategorias();
	 callProductores();
	 callMedallas(); 

  }
})();
