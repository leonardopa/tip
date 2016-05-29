(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('EmprenController',EmprenController);

  /** @ngInject */
  function EmprenController( $scope, $http) {
	  console.log("controler log in")
	   var vm = this
	   vm.isCollapsed = true;
  }
})();
