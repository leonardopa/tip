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
        
        var URL_REST_BASE = "http://localhost:8081/chasqui-mock/rest/";
        
        var PRODUCTO = URL_REST_BASE + "productos/";
        
        return {
        	url_rest: URL_REST_BASE ,
        	
        	login: URL_REST_BASE+"client/sso/singIn",
        	
        	resetPass: function (email){
        		return URL_REST_BASE+"client/resetPass/"+email ;
        	},
        	
        	singUp: URL_REST_BASE+"client/sso/singUp",
        	
        	categorias: function (idVendedor){
        		return URL_REST_BASE +"client/categoria/all/" + idVendedor;
        	},
        	
        	productores: function (idVendedor){
        		return URL_REST_BASE +"client/productor/all/" + idVendedor;
        	},
        	
        	medallas: URL_REST_BASE+"client/medalla/all", 
        	
        	productosPaginado: function (pagina,items){
        		return URL_REST_BASE + "productos/"+pagina+"/"+items ; 
        	},
        	
        	productosDestacados : URL_REST_BASE +"productos/destacados",
        	
        	productosPedidoByUser : function(idUser){
        		return URL_REST_BASE + "productos/pedidos/usuario/"+idUser;
        	},
        	
        	productosQuitar : function(idUser,idPedido,cantidad){        								               
        		return URL_REST_BASE + "productos/pedido/"+idPedido+"/usuario/" +idUser+"/quitarProducto/"+cantidad;
        	},
        	
        	productosAgregar : function(idUser,idPedido,cantidad){        								               
        		return URL_REST_BASE + "productos/pedido/"+idPedido+"/usuario/" +idUser+"/agregarProducto/"+cantidad;
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
