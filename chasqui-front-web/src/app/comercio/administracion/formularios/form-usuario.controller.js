(function() {
	'use strict';

	angular.module('chasqui').controller('FormUsuarioController',
			FormUsuarioController);

	/**
	 * @ngInject Formulario para crear un grupo
	 */
	function FormUsuarioController($log, $state, restProxy, CTE_REST,ToastCommons,StateCommons,$scope,$timeout) {
		$log.debug("controler FormUsuarioController",$scope.perfil);
		 
		var vm = this;

		vm.user = {};
		vm.passVerificacion;
		
		vm.isAlta=$scope.perfil != true;    // si crea un usuario nuevo o es un update. Si viene de perfil es UPDATE 
		vm.readOnly=! vm.isAlta; // si es alta siempre false, sino depende el modo.
		vm.isModoEdit = false; 
		
		function mostrarMensajesDeBienvenida(){
			
			$timeout(function(){
				ToastCommons.mensaje('Bienvenido !');
			 }, 3000);
			
			$timeout(function(){
				ToastCommons.mensaje('Ahora podes ingresar a CHASQUI !');
			 }, 10000);
								
			$timeout(function(){
				 ToastCommons.mensaje('Reciviras un mensaje de bienvenida por correo !');
			 }, 15000);
			
			$timeout(function(){
				 ToastCommons.mensaje('Podes seguir completando tu perfil !');
			 }, 30000);
		}
				
		
		vm.init = function (){
			if (! vm.isAlta){
				vm.callVerUsuario();
			}
		}

		vm.guardar = function() {
			vm.callGuardar();
		}
		
		vm.actualizar=function(){
			$log.debug("Actualizar usuario", vm.user);
			
			vm.callActualizarUsuario();
			
			vm.readOnly = true;
			vm.isModoEdit = false;
		}
		
		vm.edit = function (){
			$log.debug("click edit usuarrio");
			vm.readOnly = false;
			vm.isModoEdit = true;
		}
		
		vm.noActualizar=function (){
			$log.debug("click NO edit usuarrio");
			vm.readOnly = true;
			vm.isModoEdit = false;
		
			vm.callVerUsuario();
		}
		/////////// llamadas
		
		vm.callVerUsuario = function(){
			
			function doOk(response) {
				$log.debug("callVerUsuario",response);
				vm.user = response.data;
			}
		 
			
			// TODO : manejar error
			restProxy.getPrivate(CTE_REST.verUsuario, {}, doOk);
		}
		
		vm.callActualizarUsuario = function(){
			
			function doOk(response) {				 
				ToastCommons.mensaje('Se actualizo con exito');
			}
		 	delete vm.user['direccion'];
			delete vm.user['email'];
			$log.debug("***************",vm.user);
			// TODO : manejar error
	//		ToastCommons.mensaje('Falla actulizar. Ver Trello');
			restProxy.put(CTE_REST.editUsuario, vm.user, doOk);
		}
		
		// usuaruo nuevo
		vm.callGuardar = function() {
			$log.debug("guardar usuario", vm.user);

			if (vm.user.password == vm.passVerificacion) {

				function doOk(response) {
					$log.debug("guardo usuario", response.data);
					
					mostrarMensajesDeBienvenida();
					
					StateCommons.ls.token = response.data.token;
					
					//$state.go("registro",{ "isPasoDomicilio" : true});
					//$rootScope.$broadcast("creo-usuario-nuevo", { user: response.data });
					$scope.$emit("creo-usuario-nuevo", { user: response.data });
					
				}
				function doNoOk(response) {
					$log.debug("error al guardar usuario", response.data);
					
					if (response.status == 409 ){
						ToastCommons.mensaje(response.data.error);
					}else{
						ToastCommons.mensaje('error inesperado, intente nuevamente');
					}
					
				}
				// TODO : manejar error
				restProxy.postPublic(CTE_REST.singUp, vm.user, doOk,doNoOk);
			}else{
				$log.error("las contrasenas no coinciden");
				//TODO: enviar mensaje
				ToastCommons.mensaje('Las contrasenias no coinciden')
			}
		}
		
		vm.init();
	}

})();