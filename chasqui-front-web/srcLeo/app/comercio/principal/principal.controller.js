(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('PrincipalController',PrincipalController);

  /** @ngInject */
  function PrincipalController( $scope,$log,StateCommons) {
	  $log.debug("PrincipalController ..... ");
	  StateCommons.ls.itemMenuSelect = 'principal'; 
	  var vm = this;
    
  }
})();
