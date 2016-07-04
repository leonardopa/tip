(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('ComoComprarController',ComoComprarController);

  /** @ngInject */
  function ComoComprarController( $log) {
	  $log.debug('ComoComprarController ..... ') 
	   var vm = this
	   vm.hello = "ComoComprarController hello + DEFINIR QUE VA !";
  }
})();
