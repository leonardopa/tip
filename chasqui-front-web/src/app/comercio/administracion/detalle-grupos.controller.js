(function() {
	'use strict';

	angular.module('chasqui').controller('DetalleGruposController',
			DetalleGruposController);

	/**
	 * @ngInject Contenido del tab de grupo. Recibe por parametro el id del
	 *           grupo
	 */
	function DetalleGruposController($log, $scope, $timeout,
			ToastCommons, dialogCommons, gccService, StateCommons) {
		$log.debug("controler DetalleGruposController init grupo ",
				$scope.grupo)
		var vm = this;
        
		vm.grupo = $scope.grupo;
		vm.isAdmin = $scope.grupo.esAdministrador;
		vm.canAddIntegrante = true;

		/** Detacta si apretaron el boton addIntegrante en el pane de info */
		$scope.$watch(
		// "listaGruposCtrl.tabs["+vm.idGrupo+"].canAddIntegrante",
		"listaGruposCtrl.selected.canAddIntegrante", function handleFooChange(
				newValue, oldValue) {
			console.log("watch ", newValue);
			vm.canAddIntegrante = newValue
		});

		

		// // componente Chips

		var pendingSearch, cancelSearch = angular.noop;
		var cachedQuery, lastSearch;
                
                        
		vm.allContacts;
	//	loadContacts();

		vm.filterSelected = true;
		vm.querySearch = querySearch;

		/**
		 * Search for contacts; use a random delay to simulate a remote call
		 */
		function querySearch(criteria) {
			return vm.allContacts.filter(createFilterFor(criteria));
		}

		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(contact) {
				$log.debug(contact._lowername);
				$log.debug(lowercaseQuery);
				return (contact._lowername.indexOf(lowercaseQuery) != -1);
				;
			};
		}

		vm.quitarMiembro = function(miembro) {
			var nombre = miembro.nickname  == null ? miembro.email : miembro.nickname ;  
            // Esto es un resabio de la forma de cargar miembros que pronto va a ser modificado. 
            
            if(vm.isLoggedMember(miembro)){
                var pregunta = "de salir del grupo";
                var confirmacion = 'salir';          
                var fallo = 'No pudo salir del grupo de compra';
            }else{
                var pregunta =  'quitar a ' + nombre;
                var confirmacion = 'quitarlo';
                var fallo = 'No se pudo quitar a ' + nombre + ' del grupo de compra';
            }
            
            dialogCommons.confirm('Salir del grupo',
                    '¿Estas seguro de ' + pregunta + '?',
                    'Si, quiero ' + confirmacion, 'No', function() {
                        vm.callQuitarMiembro(miembro);
                    }, function() {
                        $log.debug(fallo);
            }); 
		}
		
		// //////////
		// //////REST

		/** Guardar Lista de integrantes del grupo */
		vm.guardar = function() {
			$log.debug("guarda cambios grupo");

			function doOk(response) {
				$log.debug("respuesta guardar grupos ", response);

				vm.canAddIntegrante = !vm.canAddIntegrante;
			}

			gccService.integrantesGrupo(vm.idGrupo, vm.grupo.miembros).then(doOk)

		}
		
		vm.callQuitarMiembro = function(miembro) {
			function doOk(response) {
				ToastCommons.mensaje('Se quito miembro del grupo')
				$scope.$emit("quito-miembro-grupo");
                vm.grupo.miembros.splice(vm.grupo.miembros.indexOf(miembro), 1);
			}			
			var params ={};
			params.idGrupo=vm.grupo.idGrupo;
			params.emailCliente=miembro.email;
			
			gccService.quitarMiembro(params).then(doOk)

		}

		
		
		/**
		 * Trae la lista de los integrantes del grupo y de los contactos
		 * podibles
		 */
		// TODO : cambiar la lista de contactos por un boton que pida en ingreso
		// al grupo por mail.
		// 
		// ----------- DESCOMENTADOS Y DESMOCKEADOS EN index.constants.js por FAVIO 13-6
		
		function loadContacts() {

			function doOk(response) {
				// vm.productos=response.data;
				vm.allContacts = response.data;

				angular.forEach(vm.allContacts, function(integrante) {
					integrante._lowername = integrante.nombre.toLowerCase();
					if (integrante.isEnGrupo) {
						vm.grupo.miembros.push(integrante);
					}
				});
			}

			gccService.integrantesGrupo(vm.idGrupo, {}).then(doOk)

		}
        
        vm.selfPara = function(miembro){
            return miembro.nickname + tagSelf(miembro.email == vm.grupo.emailAdministrador, "Administrador") 
                                    + tagSelf(vm.isLoggedMember(miembro), "Tú");
        }
        
        function tagSelf(condicion, tag){
            return (condicion) ? "(" + tag + ")" : "";
        }

        vm.isLoggedMember = function(miembro){
            return (miembro.email == StateCommons.ls.usuario.email);
        }
        
        
        vm.miembrosVisiblesParaUsuarioLogeado = function(){
            if(vm.grupo.miembros.reduce(function(r, m){
                return r || (vm.isLoggedMember(m) && m.invitacion != 'NOTIFICACION_ACEPTADA')
            },false)){
                return vm.grupo.miembros.filter(function(m) {return m.invitacion == "NOTIFICACION_ACEPTADA"})
            }
            return vm.grupo.miembros; 
        }
        
        vm.showRemoveGroupsMember = function(member){
            return (vm.isAdmin  && !vm.isLoggedMember(member) ) || ( !vm.isAdmin  && vm.isLoggedMember(member) );
        }
	}
})();
