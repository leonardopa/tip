(function() {
	'use strict';

	angular.module('chasqui').service('promiseService', promiseService);
	function promiseService($q,restProxy) {
		var vm = this;		

		vm.doGet = function (url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.get(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		 vm.doGetPrivate = function (url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.getPrivate(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		 vm.doPost = function (url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.post(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		 vm.doPostPublic = function (url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.postPublic(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		
		 vm.doPut = function (url,params) {		
	        var defered = $q.defer();
	        var promise = defered.promise;
	        
	        restProxy.put(url,params,      
	        		function doOk(response) {defered.resolve(response);},
					function doNoOk(response) {defered.reject(response);}
	        );
		 	 
	        return promise;
	    }
		 
		 vm.doDelete= function (url,params) {		
		        var defered = $q.defer();
		        var promise = defered.promise;
		        
		        restProxy.delete(url,params,      
		        		function doOk(response) {defered.resolve(response);},
						function doNoOk(response) {defered.reject(response);}
		        );
			 	 
		        return promise;
		    }
			
	}// function
})();// anonimo