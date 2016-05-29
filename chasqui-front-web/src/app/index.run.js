(function() {
  'use strict';

  angular
    .module('chasqui')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
