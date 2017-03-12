(function() {
	'use strict';

	angular.module('chasqui').controller('DetalleGruposController',
			DetalleGruposController);

	/**
	 * @ngInject Contenido del tab de grupo. Recibe por parametro el id del
	 *           grupo
	 */
	function DetalleGruposController($log, $scope, $timeout,
			ToastCommons, dialogCommons, perfilService) {
		$log.debug("controler DetalleGruposController inti grupo ",
				$scope.idGrupo)
		var vm = this;

		vm.idGrupo = $scope.tab.id;
		vm.isAdmin = $scope.tab.admin;
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

		vm.contacts = [];
		vm.allContacts;
		loadContacts();

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
			$log.debug("quitar miembro", miembro);
			// TODO: quitar miembro del gupo

			dialogCommons.confirm('Quitar Miembro del grupo',
					'Estas seguro de quitar a ' + miembro.nombre + ' ?',
					'Si, lo quito', 'no', function() {
						ToastCommons.mensaje('TODO: llamar servicio')
					}, function() {
						$log.debug("se quedo");
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

			perfilService.integrantesGrupo(vm.idGrupo, vm.contacts).then(doOk)

		}

		/**
		 * Trae la lista de los integrantes del grupo y de los contactos
		 * podibles
		 */
		// TODO : cambiar la lista de contactos por un boton que pida en ingreso
		// al grupo por mail.
		function loadContacts() {

			function doOk(response) {
				// vm.productos=response.data;
				vm.allContacts = response.data;

				angular.forEach(vm.allContacts, function(integrante) {
					integrante._lowername = integrante.nombre.toLowerCase();
					if (integrante.isEnGrupo) {
						vm.contacts.push(integrante);
					}
				});
			}

			perfilService.integrantesGrupo(vm.idGrupo, {}).then(doOk)

		}
	}
})();
