/**
 * Created by alejandrad on 07/04/16.
 * 
 */

(function() {
  'use strict';
  
  angular.module('chasqui').service('StateCommons', StateCommons);
  function StateCommons($localStorage) {
    var vm = this;
    vm.ls = $localStorage;

    vm.ls.token;

  }// function
})();// anonimo
