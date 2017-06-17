(function() {
	'use strict';

	angular
		.module('chasqui')
		.controller('MenuController', MenuController);

	/** @ngInject */
	function MenuController($scope, $log, $state, StateCommons, CTE_REST, $interval, ToastCommons,
			perfilService) {
		$log.debug("MenuController ..... ");
		$log.debug(StateCommons.ls.usuario);

		var vm = this;
		vm.urlBase = CTE_REST.url_base;
		vm.vendedor = StateCommons.vendedor();

		vm.options = {
			'rotation': 'circ-in',
			'duration': 1000
		};

		function initHeader() {
			vm.categorias = [];
			vm.usuario = StateCommons.ls.usuario;
			vm.isLogued = StateCommons.isLogued();

			initRefreshNotification();
			resetNotificacion();
		}

		function resetNotificacion() {
			vm.callNotificaciones = false;
			vm.icon = 'notifications_none';
			vm.fill = 'black';
		}

		function addNotificacion() {
			vm.callNotificaciones = true;
			vm.icon = 'notifications';
			vm.fill = 'red';
			ToastCommons.mensaje("Tenes una nueva notificacion")
		}

		$scope.$on('resetHeader', function(event, msg) {
			initHeader();
		});

		vm.ir = function(page) {
			$log.debug("ir a ..... ", page);

			switch (page) {
				case 'bienvenido':
					$state.go('principal')
					break;
				case 'como-comprar':
					$state.go('como-comprar')
					break;
				case 'catalogo':
					$state.go('catalogo')
					break;
				case 'emprendedores':
					$state.go('emprendedores')
					break;
				case 'medalla':
					$state.go('medalla')
					break;
				case 'lista-pedidos':
					$state.go('lista-pedidos')
					break;
				case 'lista-grupos':
					$state.go('lista-grupos')
					break;
				case 'perfil':
					$state.go('perfil')
					break;
				case 'login':
					$state.go('login')
					break;
				default:

			}


		}
		var count = 0;

		vm.classFor = function(page) {
			//	  $log.debug("classForclassForclassForclassForclassForclassForclassFor ",page);
			//	  $log.debug("classForclassForclassForclassForclassForclassForclassFor ", StateCommons.ls.itemMenuSelect);
			count++;
			//	  $log.debug("classForclassForclassForclassForclassForclassForclassFor ", count);
			if (StateCommons.ls.itemMenuSelect == page) return "md-accent";

			return "";
		}

		var llamadoPeriodico;

		vm.logOut = function() {
			$log.debug("Log Out ..... ");
			StateCommons.logOut();
			
			$interval.cancel(llamadoPeriodico);

			initHeader();

			$state.go('principal')
		}


		vm.verNotificaciones = function() {
			$log.debug("Ver notificaciones");
			vm.icon = 'notifications_none';
			vm.fill = 'black';
			$state.go('perfil', {
				index: 1
			});
		}


		function initRefreshNotification() {
			if (StateCommons.isLogued() && !StateCommons.ls.notificacionActiva) {
				$log.debug("interval notifications");
				
				llamadoPeriodico = $interval(function() {
					$log.debug("call notificaciones nuevas?");
					callNotificacionesNoLeidas();
				}, CTE_REST.INTERVALO_NOTIFICACION_MIN);
				
				StateCommons.ls.notificacionActiva=true;
			}
		}

		function callNotificacionesNoLeidas() {

			function doOk(response) {
				$log.debug('callObtenerNotificaciones', response);

				vm.notificacionesSinLeer = 0 ; 
				// TODO : filtro en el front , deberia ser por BE
				angular.forEach(response.data, function(value, key){				  
				  console.log(value.estado)
			      if(value.estado == "NOTIFICACION_NO_LEIDA")
			         vm.notificacionesSinLeer = vm.notificacionesSinLeer+1 ; 
			   });

				if (vm.notificacionesSinLeer > 0) {
					$log.debug('hay nuevas notificaciones !');
					addNotificacion();
					//ToastCommons.mensaje("Hay notificaciones "+ response.data.length +" nuevas !");
				} else {
					resetNotificacion();
				}

			}
			//TODO : DEBERIAN SER solo las NO LEIDAS
			perfilService.notificacionesLeidas(1).then(doOk);	
			//perfilService.notificacionesNoLeidas().then(doOk);	
		}


		initHeader();
	}
})();
