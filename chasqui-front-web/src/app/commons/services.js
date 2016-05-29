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
 
      $state.go('app.error', {
        key: 'GENERIC_ERROR'
      });
    }

    // todo como conservo el token aqui, para ponerlo en el header
    /**
     * REST (post, put, get , delete) . Parametros: url , params (json) , doOk
     * (funcion para respuesta exitosa ) , doNOok (funcion para caso no exitoso.
     * No es obligatoria , si no se pasa va a la pantalla de error generica por
     * defecto)
     */
    return {

      get: /*
             * function (url, params) { $log.debug('getting ' + url + ' url.'); //
             * params.callback = 'JSON_CALLBACK';
             * 
             * return $http.get(url, { params: params }).then(function
             * (response) { return response; });
             */
      function(url, params, doOk, noOk) {
        $log.debug('getting ' + url);
        $log.debug('data: ' + JSON.stringify(params));

        if (noOk == undefined) {
          noOk = doNoOkDefault;
        }

        var doGet = function() {
          $http({
            method: 'GET',
            url: url,
            data: params,
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(doOk, noOk);
        };

        doGet();
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
              'Content-Type': 'application/json'
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
              'Content-Type': 'application/json'
            }
          }).then(doOk, noOk);
        };
        doPut();
      },
      
      post: function(url, params, doOk, noOk) {
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
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(doOk, noOk);
        };

        doPost();
      }
    };// return

  }// factory

})();// function anonima
