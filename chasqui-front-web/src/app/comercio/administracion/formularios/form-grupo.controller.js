(function() {
	'use strict';

	angular.module('chasqui').controller('FormGrupoController',
			FormGrupoController);

	/**
	 * @ngInject Formulario para crear un grupo
	 */
	function FormGrupoController($log, $scope,$state, gccService,StateCommons,utilsService) {
		$log.debug("controler FormGrupoController",$state.params);
		var vm = this;
		
		vm.grupo;
		vm.user=StateCommons.ls.usuario;
		// la direccion del grupo es la misma que la del usuairio que lo
		// administra
		vm.isDireccionUsuario = true;

		if (utilsService.isUndefinedOrNull($state.params.grupo)){
			vm.isEdit=false;
		}else{
			vm.isEdit=true;	
			vm.grupo=$state.params.grupo;		
		}

		vm.guardar = function() {
			if (vm.isEdit){
				callEditarGrupo();	
			}else{
				callGuardarGrupo();
			}
			
		}

		var callGuardarGrupo = function() {
			$log.debug("guardar grupo", vm.grupo);

			function doOk(response) {
				$log.debug("respuesta guardar grupo ", response);

				// TODO: guardar el id del grupo creado

				if (vm.isDireccionUsuario) {
					$state.go("lista-grupos");
				} else {
					$state.go("form-domicilio");
				}

			}
		 
			gccService.nuevoGrupo(vm.grupo).then(doOk)
		}

		var callEditarGrupo = function() {
			$log.debug("editar grupo", vm.grupo);

			function doOk(response) {				
				$state.go("lista-grupos");								
			}
		 	//alias, idDomicilio, telefono, calle, numero, codigoPostal, localidad, provincia , token 
		 	var params = {}
		 	params.idGrupo=vm.grupo.idGrupo
		 	params.alias = vm.grupo.alias
		 	params.descripcion = vm.grupo.descripcion
			gccService.editarGrupo(params).then(doOk)
		}
	}

})();