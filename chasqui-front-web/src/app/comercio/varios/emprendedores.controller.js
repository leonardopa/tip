(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('EmprenController',EmprenController);

  /** @ngInject */
  function EmprenController( $log) {
	  $log.debug('EmprenController ..... ') 
	   var vm = this
	   vm.isCollapsed = true;
  }
})();
