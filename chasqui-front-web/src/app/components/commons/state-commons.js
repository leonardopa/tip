(function() {
  'use strict';

  angular.module('chasqui').service('StateCommons', StateCommons);

  function StateCommons($localStorage, $log, us) {
    $log.debug('INIT localstorage', $localStorage);
    $log.debug('localstorage', $localStorage.token);
    $log.debug('localstorage', $localStorage.usuario);


    var vm = this;
    vm.ls = $localStorage;

    vm.ls.token;
    vm.ls.usuario;

    vm.ls.notificacionActiva = false;

    vm.isLogued = function() {
      return !(us.isUndefinedOrNull(vm.ls.usuario) || us.isUndefinedOrNull(vm.ls.usuario.token));
    }

    vm.logOut = function() {
      vm.ls.token = undefined;
      vm.ls.usuario = {};
      vm.ls.notificacionActiva = false;
    }

    vm.vendedor = function() {
      //TODO: pedir al servicio, hacer singleton con el LS
      var config = {};
      config.id = 2;
      config.imagen = "/imagenes/usuarios/adminpds/puentedelsur.png";


      return config;
    }

  } // function
})(); // anonimo
