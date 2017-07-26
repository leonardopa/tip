(function() {
	'use strict';

	angular.module('chasqui').controller('GrupoController',
			GrupoController);

	/**
	 * @ngInject Contenido del tab de grupo. Recibe por parametro el id del
	 *           grupo
	 */
	function GrupoController($log, $scope, $timeout, ToastCommons, dialogCommons, gccService, StateCommons) {
		              
		$log.debug("GrupoController init ", $scope.grupo);
        
		var vm = this;
        
		vm.grupo = $scope.grupo;
		vm.isAdmin = $scope.grupo.esAdministrador;
		vm.canAddIntegrante = true;

        // Init
        loadContacts();

        // Funcionalidades:
        
        vm.edit = function(grupo) {			
			$state.go("form-grupo",{ "grupo" : grupo});			
		}
         
        
		vm.crearPedidoGrupal = function(grupo){
			$log.debug("--- Crear pedido grupal----",grupo);
		    callCrearPedidoGrupal(grupo);	
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
		
        

	
        // Funciones de presentacion de datos
		
        
        vm.selfPara = function(miembro){
            return miembro.nickname + tagSelf(miembro.email == vm.grupo.emailAdministrador, "Administrador") 
                                    + tagSelf(vm.isLoggedMember(miembro), "Tú");
        }
        
        function tagSelf(condicion, tag){
            return (condicion) ? "(" + tag + ")" : "";
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
        
        
        vm.isLoggedMember = function(miembro){
            return (miembro.email == StateCommons.ls.usuario.email);
        }
        
        
        ///////////////////////////////////////////////////////////////////////////////////
        
        
        
        /*/
		 * Trae la lista de los integrantes del grupo y de los contactos
		 * podibles
        /*/
		
		function loadContacts() {

			function doOk(response) {
                vm.grupo.miembros = response.data;
			}

			gccService.integrantesGrupo(vm.idGrupo, {}).then(doOk)

		}
        
		
		// ///////////
		// ///// REST
		
		function callCrearPedidoGrupal(grupo){
			function doOk(response){
				$log.debug('Crear pedido en el grupo');
				ToastCommons.mensaje("Se ha creado un pedido en el grupo");
			}
		
			var params = {};
			params.idGrupo = grupo.idGrupo;
			params.idVendedor = StateCommons.vendedor().id;

			gccService.crearPedidoGrupal(params).then(doOk);
		}
		
        
        ////////////////////////vvvvvvvvvvvvvvvvvvvvvvvvvvvvv////////////////////////
        
        /** habilita el panel para agregar integrantes. */
		vm.invitarUsuario = function(grupo) {
			$log.debug("Invitar miembro al grupo");

			function doOk(response) {
				$log.debug("Se seleccionó Invitar a usuario con mail", response);
				callInvitarUsuario(response, grupo);	
				
			};

			function doNoOk() {
				$log.debug("Se seleccionó Cancelar");
			};


			dialogCommons.prompt('Invitar miembro al Grupo',
					'Ingrese una direccion de correo electrónico', 'correo@correo.com',
					'Invitar', 'Cancelar', doOk, doNoOk);
			
		}        
        
		vm.callInvitarUsuario = function(emailClienteInvitado, grupo){
			$log.debug('callInvitarUsuario con email: ', emailClienteInvitado);


			var doOk = function (response) {
				$log.log('Se enviará un email a la dirección ', response);
				ToastCommons.mensaje("Se enviará un mail a la dirección");	
				callLoadGrupos();
			}

			var params = {
                idGrupo:        grupo.idGrupo,
                emailInvitado:  emailClienteInvitado
            };
			gccService.invitarUsuarioAGrupo(params).then(doOk);
		}
		    
        ////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^^^^^^////////////////////////
        
        
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
                
        
		vm.callSalirDelGrupo = function() {
            
            // TODO Juan
            
			function doOk(response) {
				ToastCommons.mensaje('Te fuiste del grupo')
				callLoadGrupos();
			}			
			var params ={};
			params.idGrupo=miembro.idGrupo;
			params.emailCliente=StateCommons.ls.usuario.email;
			
			gccService.quitarMiembro(params).then(doOk)

		}
        
        
               
        ////////////////////////vvvvvvvvvvvvvvvvvvvvvvvvvvvvv////////////////////////
                            // Filtro de miembros del grupo
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
        
        ////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^^^^^^////////////////////////
        
	}
})();
