(function() {
    'use strict';

    angular
        .module('chasqui')
        .controller('DemoController', DemoController);

    /** @ngInject */
    function DemoController($log,$filter,i18nService) {
        $log.debug('DemoController ..... ');

        var vm = this

        vm.texto = " Chasqui"

        vm.textoTraducido =  $filter('translate')('TRANS_EXA');
        vm.textoTraducidoService =  i18nService.get('TRANS_EXA');
        
    }
})();