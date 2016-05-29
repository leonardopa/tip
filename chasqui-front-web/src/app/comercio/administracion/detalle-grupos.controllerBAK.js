(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('DetalleGruposController',DetalleGruposController);

  /** @ngInject */
  function DetalleGruposController($http,$log,$scope,$q,$timeout) {
	  console.log("controler DetalleGruposController")
	  var vm = this;
	  vm.count=0;
	  vm.readonly=false;
	  ///////////////////
	  
	 
	    var pendingSearch, cancelSearch = angular.noop;
	    var cachedQuery, lastSearch;
	    vm.allContacts = loadContacts();
	    vm.contacts = [vm.allContacts[0]];
	    vm.asyncContacts = [];
	    vm.filterSelected = true;
	    vm.querySearch = querySearch;
	    vm.delayedQuerySearch = delayedQuerySearch;
	    /**
	     * Search for contacts; use a random delay to simulate a remote call
	     */
	    function querySearch (criteria) {
	      $log.debug(vm.count);
	      vm.count++;
	      cachedQuery = cachedQuery || criteria;
	      return cachedQuery ? vm.allContacts.filter(createFilterFor(cachedQuery)) : [];
	    }
	    /**
	     * Async search for contacts
	     * Also debounce the queries; since the md-contact-chips does not support this
	     */
	    function delayedQuerySearch(criteria) {
	      cachedQuery = criteria;
	      if ( !pendingSearch || !debounceSearch() )  {
	        cancelSearch();
	        return pendingSearch = $q(function(resolve, reject) {
	          // Simulate async search... (after debouncing)
	          cancelSearch = reject;
	          $timeout(function() {
	            resolve( vm.querySearch() );
	            refreshDebounce();
	          }, Math.random() * 500, true)
	        });
	      }
	      return pendingSearch;
	    }
	    function refreshDebounce() {
	      lastSearch = 0;
	      pendingSearch = null;
	      cancelSearch = angular.noop;
	    }
	    /**
	     * Debounce if querying faster than 300ms
	     */
	    function debounceSearch() {
	      var now = new Date().getMilliseconds();
	      lastSearch = lastSearch || now;
	      return ((now - lastSearch) < 300);
	    }
	    /**
	     * Create filter function for a query string
	     */
	    function createFilterFor(query) {
	      var lowercaseQuery = angular.lowercase(query);
	      return function filterFn(contact) {
	        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
	      };
	    }
	    function loadContacts() {
	      var contacts = [
	        'Marina Augustine',
	        'Oddr Sarno',
	        'Nick Giannopoulos',
	        'Narayana Garner',
	        'Anita Gros',
	        'Megan Smith',
	        'Tsvetko Metzger',
	        'Hector Simek',
	        'Some-guy withalongalastaname'
	      ];
	      return contacts.map(function (c, index) {
	        var cParts = c.split(' ');
	        var contact = {
	          name: c,
	          email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
	          image: 'http://lorempixel.com/50/50/people?' + index
	        };
	        contact._lowername = contact.name.toLowerCase();
	        return contact;
	      });
	    }
  }
})();
