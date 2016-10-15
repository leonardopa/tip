(function() {
  'use strict';
  
  angular.module('chasqui').service('StateCommons', StateCommons);
  function StateCommons($localStorage) {
    var vm = this;
    vm.ls = $localStorage;

    vm.ls.token;
    
    vm.ls.usuario = {};
    
    vm.ls.pedidoSeleccionado = null;
    
    

  }// function
})();// anonimo