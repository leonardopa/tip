(function() {
    'use strict';

    angular
        .module('chasqui')
        .controller('DemoController', DemoController);

    /** @ngInject */
    function DemoController($log, $filter, utilsService) {
        $log.debug('DemoController ..... ');

        var vm = this

        vm.texto = " Chasqui"

        vm.textoTraducido = $filter('translate')('TRANS_EXA');
        vm.textoTraducidoService = utilsService.translate('TRANS_EXA');

    }
})();
