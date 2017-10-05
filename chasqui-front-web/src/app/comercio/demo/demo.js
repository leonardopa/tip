(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('DemoController', DemoController);

  /** @ngInject */
  function DemoController($scope,$log, $filter, us, $mdTheming) {
    $log.debug('DemoController ..... ');

    var vm = this

    vm.texto = " Chasqui"

    vm.textoTraducido = $filter('translate')('TRANS_EXA');
    vm.textoTraducidoService = us.translate('TRANS_EXA');

    /* *********** THEME PRUEBAS */
    vm.isOn = true;

    $scope.theme = 'lime';
    vm.onoff = function() {
      $scope.theme = $scope.theme === 'indigo' ? 'lime' : 'indigo';
      /*  
      if (vm.isOn) {
        $mdTheming.generateTheme('default');
      } else {
        $mdTheming.generateTheme('altTheme');
      }*/

      vm.isOn = !vm.isOn;
    }
  }
})();
