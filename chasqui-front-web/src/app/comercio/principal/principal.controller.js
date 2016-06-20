(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('PrincipalController',PrincipalController);

  /** @ngInject */
  function PrincipalController( $scope) {
  
	  
	  var vm = this;
	  
	  vm.isOpen=false;
	  
	  
	  vm.topDirections = ['left', 'up'];
	  vm.bottomDirections = ['down', 'right'];
	  vm.isOpen = false;
	  vm.availableModes = ['md-fling', 'md-scale'];
	  vm.selectedMode = 'md-fling';
	  vm.availableDirections = ['up', 'down', 'left', 'right'];
	  vm.selectedDirection = 'up';
	  
	  /*
	  $scope.tabs = [
	                 { title:'Dynamic Title 1', content:'Dynamic content 1' },
	                 { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
	               ];

	               $scope.alertMe = function() {
	                 setTimeout(function() {
	                   $window.alert('You\'ve selected the alert tab!');
	                 });
	               };

	               $scope.model = {
	                 name: 'Tabs'
	               };*/
  }
})();
