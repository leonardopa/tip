(function() {
	'use strict';

	angular.module('chasqui').controller('ListaGruposController',
			ListaGruposController);

	/** @ngInject . Tabs de grupos con el panel de info y botones de acciones */
	function ListaGruposController($log, $scope, $state, restProxy, CTE_REST,
			StateCommons, dialogCommons, ToastCommons) {

		$log.debug("controler ListaGruposController");
		StateCommons.ls.itemMenuSelect = 'lista-grupos';
		var vm = this;
		vm.habilita = false;
		vm.count = 0;
		vm.tabs = [];
		vm.selected = null, vm.previous = null;
		vm.selectedIndex = 1;

		/** Control de cambio de tabs */
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

		/** Editar datos del grupo */
		// TODO: IMPLEMENTAR
		vm.edit = function() {
			angular.forEach(vm.tabs, function(grupo) {
				$log.debug(grupo.canAddIntegrante);
			});
			$log.debug(vm.habilita);
			vm.count++;
		}

		/** habilita el panel para agregar integrantes. */
		vm.habilitar = function() {
			$log.debug("Agregar Miembro al grupo ");
			// TODO: conectarcon servicio cuando este
			dialogCommons.prompt('Agregar Miembro al Grupo',
					'ingrese una direccion de correo', 'correo@correo.com',
					'Agregar', 'Cancelar', function(result) {
						ToastCommons.mensaje("TODO: agregar miembro al grupo");
					}, function() {
						$log.debug("Cancelo Agregar Grupo");
					});
		}

		/** Salir del grupo. Manejo del popUP */
		vm.salir = function(ev) {
			dialogCommons.confirm('Salir', 'Seguro quieres salir del grupo '
					+ vm.selected.nombre, 'Si, me voy', 'Cancelar', function(
					result) {
				callSalirGrupo();
			}, function() {
				$log.debug("se quedo");
			});
		}

		/** Redirecciona al formulario crear grupo */
		vm.crearGrupo = function(ev) {
			$state.go('form-grupo');
		};

		// ///////////
		// ///// REST

		function callLoadGrupos() {
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
			restProxy.get(CTE_REST.gruposByusuario(StateCommons.vendedor().id),
					{}, doOk);

		}

		function callSalirGrupo() {
			$log.debug("--- call salir del grupo --------", vm.selected.nombre);

			// TODO: hacer el ID de usuario dinamico
			function doOk(response) {
				$log.debug("--- call salir del grupo respuesta", response.data);

				callLoadGrupos();
			}
			ToastCommons.mensaje("MOCK");
			// TODO: hacer el ID de usuario dinamico //
			restProxy.get(CTE_REST.salirGrupo(4, vm.selected.id), {}, doOk);
		}

		// // INIT
		callLoadGrupos();

	}

})();
