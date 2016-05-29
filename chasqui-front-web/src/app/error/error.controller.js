(function() {
  'use strict';

  angular.module('chasqui').controller('ErrorController', ErrorController);

  /** @ngInject */
  function ErrorController($log, $filter, $stateParams) {
    $log.debug('Error controller starting...');
    var vm = this;
    vm.errorMessage = $filter('translate')($stateParams.key);
  }
})();
