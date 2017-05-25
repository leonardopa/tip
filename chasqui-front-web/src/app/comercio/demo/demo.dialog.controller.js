(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('DemoDialogController',DemoDialogController);

  /** @ngInject 
   * Es solo un lugar para hacer pruebas*/
  function DemoDialogController( $log ,StateCommons) {
	$log.debug('DemoDialogController ..... ') 
  	
	var vm = this
	vm.mensaje = "Esto es una pagina DEMO para pruebas varias DIALOG";
	
	vm.hola=function(){
		console.log("hola")
	}

	
  }
})();
