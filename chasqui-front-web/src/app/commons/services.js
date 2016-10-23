(function() {
  'use strict';

  angular.module('chasqui').factory('restProxy', CharquiRest);

  function CharquiRest($http, $rootScope, $log, $state, StateCommons) {
    
    /*
     * StateCommons conserva el token del usuario. Para acceder él:
     * StateCommons.token
     */
    
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    /** En caso de no ser un respues exitosa va a la pantalla de error generica */
    var doNoOkDefault = function(response) {
      $log.error("error al llamar a un servicio", response);
 
      $state.go('error', {
        key: 'GENERIC_ERROR'
      });
    }

    var createHeader = function (){
    	$log.debug('crear header ' + StateCommons.ls.usuario.email );
    	$log.debug( StateCommons.ls.usuario );
    	return 'Basic ' + btoa(StateCommons.ls.usuario.email + ':' + StateCommons.ls.usuario.token); 
    }
    
    var get = function(url,header, params, doOk, noOk){
    	$log.debug('data: ' + JSON.stringify(params));
            
        if (noOk == undefined) {
          noOk = doNoOkDefault;
        }

        var doGet = function() {
          $http({
            method: 'GET',
            url: url,
            data: params,
            headers: header
          }).then(doOk, noOk);
        };

        doGet();
      
    }
    
    var post = function(url,header, params, doOk, noOk) {
        $log.debug('posting ' + url + ' url.');
        $log.debug('data: ' + JSON.stringify(params));
 
        if (noOk == undefined) {
          noOk = doNoOkDefault;
        }

        var doPost = function() {
          $http({
            method: 'POST',
            url: url,
            data: params,
            headers: header
          }).then(doOk, noOk);
        };

        doPost();
      }
    // todo como conservo el token aqui, para ponerlo en el header
    /**
     * REST (post, put, get , delete) . Parametros: url , params (json) , doOk
     * (funcion para respuesta exitosa ) , doNOok (funcion para caso no exitoso.
     * No es obligatoria , si no se pasa va a la pantalla de error generica por
     * defecto)
     */
    return {

      get: function(url, params, doOk, noOk) {
	        $log.debug('getting Public ' + url);
	        
	        get(url, {} , params, doOk, noOk);
       
      },
      getPrivate: function(url, params, doOk, noOk) {
	        $log.debug('getting Private ' + url);
	                
	        var header = {} ;
	     
	        header = {
	                  'Content-Type': 'application/json',
	                  'Authorization': createHeader()
	                  };
	       
			
	        get(url,header, params, doOk, noOk);
     
      },
      
      delete: function(url, doOk, noOk) {
        $log.debug('delete ' + url + ' url.');

        if (noOk == undefined) {
          noOk = doNoOkDefault;
        }
        
        var doDelete = function() {
          $http({
            method: 'DELETE',
            url: url,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': createHeader()
            }
          }).then(doOk, noOk);
        };

        doDelete();
      },
      
      put: function(url, params, doOk, noOk) {
        $log.debug('putting ' + url + ' url.');
        $log.debug('data: ' + JSON.stringify(params));

        if (noOk == undefined) {
          noOk = doNoOkDefault;
        }

        var doPut = function() {
          $http({
            method: 'PUT',
            url: url,
            data: params,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': createHeader()
            }
          }).then(doOk, noOk);
        };
        doPut();
      },
      
      post: function(url, params, doOk, noOk) {
    	 var header = {} ;
 	     header = { 'Content-Type': 'application/json',
	                 'Authorization': createHeader(),
	                 'idVendedor':6
	              };
 	     
        post(url, header , params, doOk, noOk);
      },
      
      postPublic: function(url, params, doOk, noOk) {
          post(url, {} , params, doOk, noOk)
      }
      
    };// return

  }// factory

})();// function anonima
