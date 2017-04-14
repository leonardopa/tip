(function() {
	'use strict';

	angular.module('chasqui').service('utilsService', utilsService);
	function utilsService() {
		var vm = this;

		vm.isUndefinedOrNull = function(val) {
			return angular.isUndefined(val) || val === null;
		}

		vm.contieneCadena=function (stringA,stringB){
			 return stringA.indexOf(stringB) != -1;
		}

	}// function
})();// anonimo
