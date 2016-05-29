(function() {
	'use strict';

	angular.module('chasqui').controller('ListaGruposController',
			ListaGruposController);

	/** @ngInject . Tabs de grupos con el panel de info y botones de acciones*/
	function ListaGruposController($http, $log, $scope, $q, $timeout,$mdDialog, $mdMedia,$state,restProxy, CTE_REST) {
		$log.debug("controler ListaGruposController");
		
		var vm = this;
		vm.habilita = false;
		vm.count = 0;
		vm.tabs = [];
		vm.selected = null, vm.previous = null;
		vm.selectedIndex = 1;

		/**Control de cambio de tabs */ 
		$scope.$watch('selectedIndex', function(current, old) {
			vm.previous = vm.selected;
			vm.selected = vm.tabs[current];
			
			if (old + 1 && (old != current))
				if (!angular.isUndefined(vm.previous)) {
					$log.debug('Goodbye ' + vm.previous.nombre + '!');
				}
			if (current + 1)
				if (!angular.isUndefined(vm.selected)) {
					$log.debug('Hello ' + vm.selected.nombre + '!');
				}
		});

		/**Editar datos del grupo */
		//TODO: IMPLEMENTAR
		vm.edit = function() {
			angular.forEach(vm.tabs, function(grupo) {
				$log.debug(grupo.canAddIntegrante);
			});
			$log.debug(vm.habilita);
			vm.count++;
		}

		/** habilita el panel para agregar integrantes. */
		vm.habilitar = function() {
			vm.selected.canAddIntegrante = !vm.selected.canAddIntegrante;			
		}

		/** Salir del grupo. Manejo del popUP */
		vm.salir = function(ev) {
			$log.debug(event);
			//TODO: externalizar
			var confirm = $mdDialog.confirm().title(
					'Seguro quieres salir del grupo '+vm.selected.nombre + ' ?').textContent(
					'Mala onda, tus amigos van a pagar todo mas caro !')
					.ariaLabel('Lucky day').targetEvent(ev).ok('Si, me voy')
					.cancel('bueno, me quedo');
			$mdDialog.show(confirm).then(function() {
				callSalirGrupo();
			}, function() {
				$log.debug("se quedo");
			});

		}
		
		/** Redirecciona al formulario crear grupo */
		vm.crearGrupo = function(ev) {		
			$state.go('form-grupo');
		};
		 
		/////////////
		/////// REST
		
		function callLoadContacts() {
			$log.debug("--- find grupos--------");

			function doOk(response) {
				$log.debug("--- find grupos respuesta", response.data);
				vm.tabs = response.data;
				vm.disabled = false;

				angular.forEach(vm.tabs, function(grupo) {
					grupo.canAddIntegrante = false;
				});

				vm.selected = vm.tabs[0];
			}
			
			// TODO: hacer el ID de usuario dinamico
		    restProxy.get(CTE_REST.gruposByusuario(6),{},doOk);
		}
		
		function callSalirGrupo(){
			$log.debug("--- call salir del grupo --------" , vm.selected.nombre);

			// TODO: hacer el ID de usuario dinamico
			$http.get("http://localhost:8081/chasqui-mock/usuarios/4/grupos/"+vm.selected.id+"/salir")
					.then(doOk)

			function doOk(response) {
				$log.debug("--- call salir del grupo respuesta", response.data);
				 				
				callLoadContacts();
			}

			// TODO: hacer el ID de usuario dinamico
		    restProxy.get(CTE_REST.salirGrupo(4,vm.selected.id),{},doOk);
		}
		
		
		//// INIT
		callLoadContacts();
		
		
	}

})();
