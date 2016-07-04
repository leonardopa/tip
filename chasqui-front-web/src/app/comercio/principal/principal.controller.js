(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('PrincipalController',PrincipalController);

  /** @ngInject */
  function PrincipalController( $scope,$log,restProxy, CTE_REST, $timeout,StateCommons) {
	  $log.debug("PrincipalController ..... ",StateCommons.ls.pedidoSeleccionado);
	  
	  var vm = this;

	  vm.hello = "PrincipalController ...  hello";
	 
  
  }
})();
