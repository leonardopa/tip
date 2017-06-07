(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('ComoComprarController',ComoComprarController);

  /** @ngInject */
  function ComoComprarController( $log ,StateCommons) {
	  $log.debug('ComoComprarController ..... ') 
	  StateCommons.ls.itemMenuSelect = 'como-comprar';
	   var vm = this
	   vm.hello = "ComoComprarController hello + DEFINIR QUE VA !";
  }
})();
