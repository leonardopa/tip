(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('DemoController',DemoController);

  /** @ngInject 
   * Es solo un lugar para hacer pruebas*/
  function DemoController( $log ,StateCommons,$mdDialog) {
	  $log.debug('DemoController ..... ') 
  
	   var vm = this
	   vm.mensaje = "Esto es una pagina DEMO para pruebas varias";
	  
	  //////////////// DIALOG CUSTOM
	  
	  vm.showAdvanced = function(ev) {
		    $mdDialog.show({
		      controller: DemoController,
		      templateUrl: '/app/comercio/demo/dialog1.tmpl.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen:false // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		       vm.mensaje = 'You said the information was "' + answer + '".';
		    }, function() {
		       vm.mensaje = 'You cancelled the dialog.';
		    });
		  };
		  
	  
  }
})();
