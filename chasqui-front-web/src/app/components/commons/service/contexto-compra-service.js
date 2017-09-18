(function() {
	'use strict';

	angular.module('chasqui').service('contextoCompraService', contextoCompraService);
	/** Orquesta grupos y pedidos
		- Utils con Logica que podria estar en backend
		- Cache para evitar llamadas continuas
		- La cache limpia automaticamente 
				- a los N segundos
				- ante un F5 del browser
				- cuando llega una notificacion (supone algun cambio)
		- La cache se puede limpiar manualmente cuando se llama un servicio que se 
		sabe impacta en datos, por ejemplo borrar miembro.
		 */
	function contextoCompraService($log, us, StateCommons, $localStorage, 
		productoService, gccService, $q, $timeout, $rootScope,moment,CTE_REST) {
		var vm = this;
		//alert("contextoCompraService")
		vm.ls = $localStorage;

		// Representa el concepto de grupo indivial para el caso de que no tiene un pedido abierto
		var gIndividualFicticio = {}
		gIndividualFicticio.alias = "Personal";
		gIndividualFicticio.esAdministrador = false;
		gIndividualFicticio.idPedidoIndividual = -1;

		vm.ls.grupoSelected = gIndividualFicticio;
		vm.ls.pedidoSelected;
		vm.ls.varianteSelected = undefined;
		vm.ls.pedidos = undefined;
		vm.ls.grupos = undefined;
		vm.ls.lastUpdate=moment();		
			 
		vm.getGrupos = function() {
			var defered = $q.defer();
			var promise = defered.promise;

			if (vencioTiempoChache()) $log.debug("cache grupo vencida");

			if (vm.ls.grupos && !vencioTiempoChache()) {
				$log.debug("tiene grupos en cache", vm.ls.grupos)
				defered.resolve(vm.ls.grupos);
			} else {
				$log.debug("NO tiene grupos en cache")
				function doOK(response) {					
					vm.ls.lastUpdate=moment();	
					vm.ls.grupos = [gIndividualFicticio];
					vm.ls.grupos = vm.ls.grupos.concat(response.data);
					defered.resolve(vm.ls.grupos);
				}
				gccService.gruposByusuario().then(doOK);
			}

			return promise;
		}

		vm.getPedidos = function() {
			var defered = $q.defer();
			var promise = defered.promise;

			if (vencioTiempoChache()) $log.debug("cache pedido vencida");

			if (vm.ls.pedidos && !vencioTiempoChache()) {
				$log.debug("tiene pedidos en cache", vm.ls.pedidos)
				defered.resolve(vm.ls.pedidos);
			} else {
				$log.debug("NO tiene pedidos en cache, fue a buscar")
				function doOkPedido(response) {					
					window.getPedidos++;
					vm.ls.lastUpdate=moment();	
					vm.ls.pedidos = response.data;
					actualizarPedidoSelected();
					//vm.setContextoByGrupo(vm.ls.grupoSelected);
					//$rootScope.$emit('contexto.pedido.actualizar');
					defered.resolve(vm.ls.pedidos);
				}

				gccService.pedidosByUser().then(doOkPedido);


			}

			return promise;
		}


		vm.tienePedidoInividual = function() {
			angular.forEach(vm.ls.pedidos, function(pedido, key) {
				if (us.isUndefinedOrNull(pedido.aliasGrupo))
					return true;
			});

			return false;
		}

		vm.reset = function() {
			$log.debug("reset contexto");
			vm.ls.grupoSelected = gIndividualFicticio;
			vm.ls.pedidoSelected = undefined;
			vm.ls.varianteSelected = undefined;
			vm.ls.pedidos = undefined;
			vm.ls.grupos = undefined;
			//tieneEnChache = false;
		}

		vm.refresh = function() {
			vm.refreshPedidos();
			vm.refreshGrupos();
		}

		vm.refreshPedidos = function() {
			$log.debug("refreshPedidos");
			vm.ls.pedidos = undefined;
			return vm.getPedidos();
		}

		vm.refreshGrupos = function() {
			$log.debug("refreshGrupos");
			vm.ls.grupos = undefined;
			return vm.getGrupos();
		}

		vm.setContextoByPedido = function(pedido) {
			vm.ls.pedidoSelected = pedido;
			vm.ls.grupoSelected = getGrupoByPedido(pedido);
		}

		vm.setContextoByGrupo = function(grupo) {
			$log.debug("setContextoByGrupo",grupo)
			vm.ls.grupoSelected = grupo;
			vm.ls.pedidoSelected = getPedidoByGrupo(grupo);
			$log.debug("pedidoSelected es ",vm.ls.pedidoSelected);
			//$rootScope.$emit('contexto.compra.cambia.grupo', grupo);
		}

		vm.isGrupoIndividualSelected = function() {
			return us.isUndefinedOrNull(vm.ls.grupoSelected) || vm.ls.grupoSelected.alias == 'Personal';
		}

		vm.isPedidoInividualSelected = function() {
			return vm.ls.pedidoSelected.idGrupo == null;
		}

		vm.isAdmin = function(pedidoParam) {
			var result = false;
			angular.forEach(vm.ls.grupos, function(grupo, key) {
				if (grupo.esAdministrador) {
					angular.forEach(grupo.miembros, function(miembro, key) {
						if (miembro.pedido && miembro.pedido.id === pedidoParam.id) {
							result = true;
						};
					});
				}
			});

			return result;
		}

		////////////
		/// privados 
		function actualizarPedidoSelected(){
			angular.forEach(vm.ls.pedidos, function(pedido, key) {
					if (!us.isUndefinedOrNull(vm.ls.pedidoSelected) && pedido.id === vm.ls.pedidoSelected.id)
							vm.ls.pedidoSelected = pedido;
				});
		}

		function getGrupoByPedido(pedido) {
			var grupoCurrent = gIndividualFicticio;

			angular.forEach(vm.ls.grupos, function(grupo, key) {
				if (pedido.id === grupo.idPedidoIndividual)
					grupoCurrent = grupo;
			});


			return grupoCurrent;
		}

		function getPedidoByGrupo(grupo) {
			// es algun gcc
			var pedidoCurrent = undefined; // o no tiene pedido

			if (!us.isUndefinedOrNull(grupo)){
				angular.forEach(vm.ls.pedidos, function(pedido, key) {
				//	if (pedido.id === grupo.idPedidoIndividual)
					if (pedido.idGrupo === grupo.idGrupo)
							pedidoCurrent = pedido;
				});
				// si es indivudual
				if (grupo.alias == 'Personal') {
					angular.forEach(vm.ls.pedidos, function(pedido, key) {
						if (us.isUndefinedOrNull(pedido.idGrupo))
							pedidoCurrent = pedido;
					});
				}
			}
			
			return pedidoCurrent;

		}

		function vencioTiempoChache(){
			return parseInt(moment().diff(vm.ls.lastUpdate))/1000 > CTE_REST.TIEMPO_MAX_CACHE;
		}
		////////
		/*
			    function initContexto(){
					
					if (! us.isUndefinedOrNull(StateCommons.ls.pedidoSelected)
				       && us.isUndefinedOrNull(StateCommons.ls.grupoSelected)){
						// viene de la pantalla de pedido con uno seleccionado
						vm.grupoSelected=getGrupoByPedido(StateCommons.ls.pedidoSelected);
						StateCommons.ls.grupoSelected=vm.grupoSelected;
					} else if (us.isUndefinedOrNull(StateCommons.ls.grupoSelected)){
						vm.grupoSelected=gIndividualFicticio;
						} else{
						vm.grupoSelected=StateCommons.ls.grupoSelected;
					}	
				}
			
				 

			    


				

				function setSelected(){
					//console.log(StateCommons.ls.grupoSelected.idPedidoIndividual)
					if (! us.isUndefinedOrNull(StateCommons.ls.grupoSelected)){
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
		function callGccPedidos() {
			function doOkPedido(response) {
				vm.ls.pedidos = vm.ls.pedidos.concat(response.data);
			}

			gccService.pedidosByUser().then(doOkPedido);
		}

		function callGrupos() {
			function doOK(response) {
				vm.ls.grupos.push(gIndividualFicticio);
				vm.ls.grupos = vm.ls.grupos.concat(response.data);
			}

			gccService.gruposByusuario().then(doOK);
		}


		////////////////////
		////////// INIT 
		//if (StateCommons.isLogued()) vm.refresh();
		$(window).unload(function() {
			$log.debug("reset por F5");
			vm.ls.pedidos = undefined;
			vm.ls.grupos = undefined;
		});
	} // function
})(); // anonimo
