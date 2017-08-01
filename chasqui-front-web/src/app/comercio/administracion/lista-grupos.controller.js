(function() {
	'use strict';

	angular.module('chasqui').controller('ListaGruposController',
		ListaGruposController);

	/** @ngInject . Tabs de grupos con el panel de info y botones de acciones */
	function ListaGruposController($log, $scope, $state,
		StateCommons, dialogCommons, ToastCommons, perfilService, gccService, CTE_REST, contextoCompraService, us) {

		$log.debug("controler ListaGruposController");
		StateCommons.ls.itemMenuSelect = 'lista-grupos';
		var vm = this;
		vm.habilita = false;
		vm.count = 0;
		vm.groups = [];
		vm.selected = null, vm.previous = null;
		vm.selectedIndex = 1;
		vm.urlBase = CTE_REST.url_base;

		/** Control de cambio de tabs */
		$scope.$watch('selectedIndex', function(current, old) {
			vm.previous = vm.selected;
			vm.selected = vm.groups[current];

			if (old + 1 && (old != current))
				if (!angular.isUndefined(vm.previous)) {
					$log.debug('Goodbye ' + vm.previous.alias + '!');
				}
			if (current + 1)
				if (!angular.isUndefined(vm.selected)) {
					$log.debug('Hello ' + vm.selected.alias + '!');
				}
		});

		function setTabSeleccionado(grupo) {
			var i = 0
			var indexSelect = 0;
			var existe = false;
			$log.debug("Tabs: ", vm.groups);
			angular.forEach(vm.groups, function(tab) {
				$log.debug("setTabSeleccionado", tab.idGrupo + " " + tab.alias);
				if ((grupo != undefined) && (tab.idGrupo == grupo.idGrupo)) {
					indexSelect = i;
					existe = true;
				}

				i++;
			});

			if (existe) {
				vm.selected = vm.groups[indexSelect];
				vm.selectedIndex = indexSelect;
			}

		}

		$scope.$on('quito-miembro-grupo',
			function(event) {
				callLoadGrupos();
			});

		vm.edit = function(grupo) {
			$state.go("form-grupo", { "grupo": grupo });
		}

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


			dialogCommons.prompt(us.translate('INV_MIEMBRO'),
				us.translate('INGRESAR_CORREO'), 'correo@correo.com',
				us.translate('INVITAR'), us.translate('CANCELAR'), doOk, doNoOk);

		}

		/** Salir del grupo. Manejo del popUP */
		vm.salir = function(tab) {
			dialogCommons.confirm(us.translate('SALIR'), us.translate('SEGURO_SALIR') +
				vm.selected.alias, us.translate('SI_MEVOY'), us.translate('CANCELAR'),
				function(
					result) {
					callQuitarMiembro(tab);
				},
				function() {
					$log.debug("se quedo");
				});
		}

		/** Redirecciona al formulario crear grupo */
		vm.crearGrupo = function(ev) {
			$state.go('form-grupo');
		};


		vm.crearPedidoGrupal = function(grupo) {
			$log.debug("--- Crear pedido grupal----", grupo);
			callCrearPedidoGrupal(grupo);
		}


		// ///////////
		// ///// REST

		function callCrearPedidoGrupal(grupo) {
			function doOk(response) {
				$log.debug('Crear pedido en el grupo');
				ToastCommons.mensaje(us.translate('NUEVO_PEDIDO'));
			}

			var params = {};
			params.idGrupo = grupo.idGrupo;
			params.idVendedor = StateCommons.vendedor().id;

			gccService.crearPedidoGrupal(params).then(doOk);
		}

		function callInvitarUsuario(emailClienteInvitado, grupo) {
			$log.debug('callInvitarUsuario con email: ', emailClienteInvitado);


			var doOk = function(response) {
				$log.log('Se enviará un email a la direcciónn ', response);
				ToastCommons.mensaje(us.translate('ENVIARA_MAIL'));
				callLoadGrupos();
			}

			var params = {
				idGrupo: grupo.idGrupo,
				emailInvitado: emailClienteInvitado
			}
			gccService.invitarUsuarioAGrupo(params).then(doOk);
		}

		function callLoadGrupos() {
			$log.debug("--- find grupos--------");

			function doOk(data) {
				$log.debug("--- find grupos respuesta", data);
				vm.groups = [];
				angular.forEach(data, function(grupo) {
					grupo.canAddIntegrante = false;
					if (grupo.alias != 'Personal') vm.groups.push(grupo);
				});

				setTabSeleccionado(contextoCompraService.ls.grupoSelected)

			}

			// gccService.gruposByusuario().then(doOk)
			contextoCompraService.refreshGrupos().then(doOk);
		}

		function callQuitarMiembro(miembro) {
			$log.debug("quitar", miembro)

			function doOk(response) {
				ToastCommons.mensaje(us.translate('TE_FUISTE_GRUPO'))
				callLoadGrupos();
			}
			var params = {};
			params.idGrupo = miembro.idGrupo;
			params.emailCliente = StateCommons.ls.usuario.email;

			gccService.quitarMiembro(params).then(doOk)

		}


		// // INIT
		callLoadGrupos();

	}

})();
