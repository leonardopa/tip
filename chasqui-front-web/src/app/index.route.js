(function() {
  'use strict';

  angular
    .module('chasqui')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }) 
      .state('principal', {
        url: '/',
        templateUrl: 'app/comercio/principal/principal.html',
        controller: 'PrincipalController',
        controllerAs: 'principal'
      })
      .state('menu', {
          url: '/',
          templateUrl: 'app/comercio/principal/menu.html',
          controller: 'MenuController',
          controllerAs: 'menu'
        })
     
      .state('emprendedores', {
          url: '/emprendedores',
          templateUrl: 'app/comercio/varios/emprendedores.html',
          controller: 'EmprenController',
          controllerAs: 'enpren'
        })
         .state('lista-grupos', {
          url: '/lista-grupos',
          templateUrl: 'app/comercio/administracion/lista-grupos.html',
          controller: 'ListaGruposController',
          controllerAs: 'listaGruposCtrl'
        })
         .state('detalle-grupos', {
          url: '/detalle-grupos',
          templateUrl: 'app/comercio/administracion/detalle-grupos.html',
          controller: 'DetalleGruposController',
          controllerAs: 'detalleGruposController'
        })
         .state('form-domicilio', {
          url: '/form-domicilio',
          templateUrl: 'app/comercio/administracion/formularios/form-direccion.html',
          controller: 'FormDireccionController',
          controllerAs: 'direccionCtrl',
          params:{test:null}
        })
        .state('form-grupo', {
          url: '/form-grupo',
          templateUrl: 'app/comercio/administracion/formularios/form-grupo.html',
          controller: 'FormGrupoController'        
        })
         .state('login', {
          url: '/',
          templateUrl: 'app/comercio/administracion/formularios/login.html',
          controller: 'LogInController',
          controllerAs: 'loginCtrl'
        })
         .state('form-usuario', {
          url: '/form-usuario',
          templateUrl: 'app/comercio/administracion/formularios/form-usuario.html',
          controller: 'FormUsuarioController',
          controllerAs: 'usuarioCtrl',
          params:{domicilio:null}
        })  
        
        .state('lista-pedidos', {
          url: '/lista-pedidos',
          templateUrl: 'app/comercio/carrito/lista-pedidos.html',
          controller: 'ListaPedidosController',
          controllerAs: 'listaPedidoCtrl'
        })
         .state('detalle-pedido', {
          url: '/detalle-pedido',
          templateUrl: 'app/comercio/carrito/detalle-pedido.html',
          controller: 'DetallePedidoController'        
        })
        .state('app.error', {
        url: '/error/:key',
        controller: 'ErrorController as error',
        templateUrl: 'app/error/error.html'
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
