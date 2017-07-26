(function() {
	'use strict';

	angular.module('chasqui').controller('ListaGruposController',
			ListaGruposController);

	/** @ngInject . Tabs de grupos con el panel de info y botones de acciones */
	function ListaGruposController($log, $scope, $state,
			StateCommons, dialogCommons, ToastCommons,perfilService,gccService,CTE_REST
			,contextoCompraService) {

		$log.debug("controler ListaGruposController");
		StateCommons.ls.itemMenuSelect = 'lista-grupos';
		var vm = this;
		vm.habilita = false;
		vm.count = 0;
		vm.groups = [];
		vm.selected = null, vm.previous = null;
		vm.selectedTabIndex = 0;  
		vm.urlBase = CTE_REST.url_base;

		/** Control de cambio de tabs */
		$scope.$watch('selectedTabIndex', function(current, old) {
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

		function setTabSeleccionado(grupo){
			var i = 0
			var indexSelect = 0;
			var existe = false;
            $log.debug("Tabs: ", vm.groups);
			angular.forEach(vm.groups, function(tab) {
				$log.debug("setTabSeleccionado", tab.idGrupo + " " + tab.alias);
				if ((grupo != undefined) && (tab.idGrupo == grupo.idGrupo)) {
					$log.debug("****** " + tab.idGrupo);
					indexSelect = i;
					existe=true;
				}

				i++;
			});
			
			if (existe){
				vm.selected = vm.groups[indexSelect];
				vm.selectedTabIndex = indexSelect;
			}
			
		}
		
		
		/** Redirecciona al formulario crear grupo */
		vm.crearGrupo = function(ev) {
			$state.go('form-grupo');
		};

        function callLoadGrupos() {
			$log.debug("--- find grupos--------");

			function doOk(data) {
				$log.debug("--- find grupos respuesta", data);
				vm.groups = [];		
				angular.forEach(data, function(grupo) {
					grupo.canAddIntegrante = false;
					if (grupo.alias!='Personal') vm.groups.push(grupo);
				});

				setTabSeleccionado(contextoCompraService.ls.grupoSelected)
			
			}

			// gccService.gruposByusuario().then(doOk)
			contextoCompraService.getGrupos().then(doOk);
		}
        
        
		// // INIT
		callLoadGrupos();

	}

})();
