(function() {
	'use strict';

	angular.module('chasqui').service('contextoCompraService', contextoCompraService);
	function contextoCompraService($log,utilsService,StateCommons,$localStorage,productoService
		,gccService,$q,$timeout,$rootScope ) {
		var vm = this;
		//alert("contextoCompraService")
		vm.ls = $localStorage;

		// Representa el conepto de grupo indivial para el caso de que no tiene un pedido abierto
		var gIndividualFicticio={}
		gIndividualFicticio.alias="Personal";
		gIndividualFicticio.esAdministrador=false;
		gIndividualFicticio.idPedidoIndividual=-1;

		vm.ls.grupoSelected=gIndividualFicticio;
	    vm.ls.pedidoSelected; 
	    vm.ls.varianteSelected; 
	    vm.ls.pedidos=undefined;
	    vm.ls.grupos=undefined;
	    var tieneEnChache=false;
	    
		

		vm.getGrupos = function () {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        if (vm.ls.grupos){
	        	$log.debug("tiene grupos en cache",vm.ls.grupos)
				defered.resolve(vm.ls.grupos);
	        }else{
	        	function doOK(response){
	        		$log.debug("NO tiene grupos en cache, fue a buscar",response.data)	
	        		vm.ls.grupos = [gIndividualFicticio];				
					vm.ls.grupos = vm.ls.grupos.concat(response.data);						
					defered.resolve(vm.ls.grupos);	
				}
				gccService.gruposByusuario().then(doOK);
	        }

	        return promise;
	    }

	    vm.getPedidos = function () {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        if (vm.ls.pedidos){
	        	$log.debug("tiene pedidos en cache",vm.ls.pedidos)
				defered.resolve(vm.ls.pedidos);
	        }else{
	        
					function doOkPedido(response){	
						$log.debug("NO tiene pedidos en cache, fue a buscar",response.data)
						vm.ls.pedidos=response.data;
						defered.resolve(vm.ls.pedidos);	
					}

					gccService.pedidosByUser().then(doOkPedido);
			

	        }
 
	        return promise;
	    }
 

	    vm.refresh = function (){
	    	vm.ls.pedidos=undefined;
	   		vm.ls.grupos=undefined;
	    	vm.getPedidos();
	    	vm.getGrupos();	
	    //	callPedidoIndividual();
	    //	callGccPedidos();
	   // 	callGrupos();
	    }

	    vm.setContextoByPedido = function (pedido){	    	
	   		vm.ls.pedidoSelected=pedido;
	   		// TODO : y setear el grupo
	   		vm.ls.grupoSelected = getGrupoByPedido(pedido);
	    }

	    vm.setContextoByGrupo = function (grupo){
			console.log("setContextoByGrupo")
			vm.ls.grupoSelected=grupo;
			// TODO y setear el pedido
			vm.ls.pedidoSelected = getPedidoByGrupo(grupo);

			$rootScope.$emit('contexto.compra.cambia.grupo', grupo);
	    }

	    vm.isGrupoIndividualSelected=function(){
        	return utilsService.isUndefinedOrNull(vm.ls.grupoSelected)  || vm.ls.grupoSelected.alias =='Personal';
    	}

	    vm.isPedidoInividualSelected=function(){         
	        return vm.ls.pedidoSelected.idGrupo == null;
	    }


	    ////////////
	    /// privados 

	    function getGrupoByPedido(pedido){
			var grupoCurrent=gIndividualFicticio;

			angular.forEach(vm.ls.grupos, function(grupo, key) {
			  if (pedido.id ===  grupo.idPedidoIndividual) 
			  	grupoCurrent=grupo;
			});
		
			
			return grupoCurrent;
		}

		function getPedidoByGrupo(grupo){		
			// es algun gcc
			var pedidoCurrent=undefined;// o no tiene pedido

			angular.forEach(vm.ls.pedidos, function(pedido, key) {
			  if (pedido.id ===  grupo.idPedidoIndividual) 
			  	pedidoCurrent=pedido;
			});
			// si es indivudual
			if(grupo.alias=='Personal'){				
				angular.forEach(vm.ls.pedidos, function(pedido, key) {								
			  		if (utilsService.isUndefinedOrNull(pedido.idGrupo))
			  			pedidoCurrent = pedido;
				});	
			}			
			
			return pedidoCurrent;
			
		}

	    ////////
/*
	    function initContexto(){
			
			if (! utilsService.isUndefinedOrNull(StateCommons.ls.pedidoSelected)
		       && utilsService.isUndefinedOrNull(StateCommons.ls.grupoSelected)){
				// viene de la pantalla de pedido con uno seleccionado
				vm.grupoSelected=getGrupoByPedido(StateCommons.ls.pedidoSelected);
				StateCommons.ls.grupoSelected=vm.grupoSelected;
			} else if (utilsService.isUndefinedOrNull(StateCommons.ls.grupoSelected)){
				vm.grupoSelected=gIndividualFicticio;
				} else{
				vm.grupoSelected=StateCommons.ls.grupoSelected;
			}	
		}
	
		 

	    


		

		function setSelected(){
			//console.log(StateCommons.ls.grupoSelected.idPedidoIndividual)
			if (! utilsService.isUndefinedOrNull(StateCommons.ls.grupoSelected)){
				angular.forEach(vm.pedidos, function(pedido) {
	 				if (StateCommons.ls.grupoSelected.idPedidoIndividual == pedido.id){			
	     				vm.pedidoSelected=StateCommons.ls.pedidoSelected;  		
					}
  				});
			}			
		}
*/

	    ///////////////////////////////
	    //////////

/*
	    function callPedidoIndividual(){			
			function doOkPedido(response){					
				vm.ls.pedidos=vm.ls.pedidos.concat(response.data);				
			}

			productoService.verPedidoIndividual().then(doOkPedido);
		}
*/		
		function callGccPedidos(){			
			function doOkPedido(response){	
				vm.ls.pedidos=vm.ls.pedidos.concat(response.data);				
			}

			gccService.pedidosByUser().then(doOkPedido);
		}

		function callGrupos(){
			function doOK(response){	
				vm.ls.grupos.push(gIndividualFicticio);				
				vm.ls.grupos = vm.ls.grupos.concat(response.data);						
			}

			gccService.gruposByusuario().then(doOK);
		}


		////////////////////
		////////// INIT 
		if (StateCommons.isLogued()) vm.refresh();

	}// function
})();// anonimo
