/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('chasqui')
    .constant('settings', {
            APP_TITLE: 'chasqui',
            API_URL: 'http://localhost/api',
            DEBUG_ENABLED: true
          })
  
    .constant('CTE_REST',  function() {
        
        var URL_REST_BASE = "http://localhost:8081/chasqui-mock/";
        
        var PRODUCTO = URL_REST_BASE + "productos/";
        
        return {
        	url_rest: URL_REST_BASE ,
        	
        	productosPaginado: function (pagina,items){
        		return URL_REST_BASE + "productos/"+pagina+"/"+items ; 
        	},
        	
        	productosDestacados : URL_REST_BASE +"productos/destacados",
        	
        	productosPedidoByUser : function(idUser){
        		return URL_REST_BASE + "productos/pedidos/usuario/"+idUser;
        	},
        	
        	gruposByusuario: function (idUser) {
        		return URL_REST_BASE + "usuarios/" +idUser + "/grupos/";
        	},
        
        	salirGrupo: function (idUser,idGrupo){
        		return URL_REST_BASE + "usuarios/"+idUser+"/grupos/"+idGrupo+"/salir";
        	},
        	
        	integrantesGrupo :function (idGrupo){
        		return URL_REST_BASE + "usuarios/grupos/"+idGrupo+"/integrantes";
        	}, 
        	
        	direccionGrupo : function (idGrupo){
        		return URL_REST_BASE + "direccion/grupo/"+idGrupo +"/";
        	},      
        	
        	direccionUsuario : function (idUsuario){
        		return URL_REST_BASE + "direccion/usuario/"+idUsuario;
        	}
        }
    
    }()
    );

})();
