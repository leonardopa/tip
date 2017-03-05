(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('PrincipalController',PrincipalController);

  /** @ngInject */
  function PrincipalController( $scope,$log,restProxy, CTE_REST, $timeout,StateCommons) {
	  $log.debug("PrincipalController ..... ",StateCommons.ls.pedidoSeleccionado);
	  StateCommons.ls.itemMenuSelect = 'principal'; 
	  var vm = this;

  }
})();
