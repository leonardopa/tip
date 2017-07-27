(function() {
    'use strict';

    angular
        .module('chasqui')
        .controller('DemoController', DemoController);

    /** @ngInject */
    function DemoController($log) {
        $log.debug('DemoController ..... ');

        var vm = this

        vm.texto = " Chasqui"


    }
})();