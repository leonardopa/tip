(function() {
  'use strict';

  angular
    .module('chasqui')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope,$state,StateCommons,utilsService) {

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
	    
	    $log.debug("is log", StateCommons.isLogued());	      
		$log.debug("devbe ", toState.auth);	 
		
		if (utilsService.isUndefinedOrNull(toState.auth)) 
			toState.auth = false

		if(toState.auth && (! StateCommons.isLogued() )) {
			$log.debug("ir a logu !!!",toState.name);	
			event.preventDefault(); 
			$state.go('login',{toPage :toState.name })
		}
		
	});


    $log.debug('runBlock end');
  }

})();
