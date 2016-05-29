(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('LogInController',LogInController);

  /** @ngInject */
  function LogInController( $scope, $http, $log) {	  
	   $log.log('controler log in ..... ');
	   
	   var vm = this
	   vm.isCollapsed = true;
  }
})();
