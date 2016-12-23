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

        //Servidor LOCAL
        var URL_BASE_MOCK = "http://localhost:8081/chasqui-mock/rest/";
        //var URL_REST_BASE = "http://localhost:8081/chasqui-mock/rest/";
        
        //Servidor REMOTOs
        var URL_REST_BASE = "http://168.181.184.203:8080/chasqui-mock/rest/";
        var URL_BASE = "http://168.181.184.203:8080/chasqui/";
       

        var URL_REST_BASE = URL_BASE+"rest/";
        
        var PRODUCTO = URL_REST_BASE + "productos/";
        
        var idVendedor = 5;

        var nombreVendedor = 'adminpds';


        
        return {
        	INTERVALO_NOTIFICACION_MIN : 60000,
        	
            defaultLogo: "imagenes/logo_ch_login.png",

        	idVendedor: idVendedor, //TODO : hasta que sea dinamico

            vendedor:  URL_REST_BASE+"client/vendedor/"+nombreVendedor,

            catalogo:  URL_REST_BASE+"client/catalogo", //Para que se deduzca de la URL
                 
        	url_base: URL_BASE,
        	
        	url_rest: URL_REST_BASE ,
        	
        	login: URL_REST_BASE+"client/sso/singIn",
        	
        	resetPass: function (email){
        		return URL_REST_BASE+"client/sso/resetPass/"+email ;
        	},
        	
        	singUp: URL_REST_BASE+"client/sso/singUp",
        	
        	categorias: function (idVendedor){
        		return URL_REST_BASE +"client/categoria/all/" + idVendedor;
        	},
        	 
        	productores: function (idVendedor){
        		return URL_REST_BASE +"client/productor/all/" + idVendedor;
        	},

           // productosSinFiltro: URL_REST_BASE + "client/producto/sinFiltro",

            productosSinFiltro: function (idVendedor){
                return URL_REST_BASE + "client/producto/sinFiltro";
            },
        	
        	medallas: URL_REST_BASE +"client/medalla/all", 

          
        	
        	medallasProducto: URL_REST_BASE + "client/medalla/producto/all",
        	
        	medallasProductor : URL_REST_BASE + "client/medalla/productor/all",
        	
        	medallaById: function (id){

        		return URL_REST_BASE +"client/producto/medalla/idMedalla/" + id; 

        	},
        	 
        	productosByCategoria: URL_REST_BASE + "client/producto/byCategoria",
        	
        	productosByProductor: URL_REST_BASE + "client/producto/byProductor",
        	
        	productosByMedalla: URL_REST_BASE+"client/producto/byMedalla",
        	
        	productosByQuery : URL_REST_BASE + "client/producto/byQuery",
          	
        	verUsuario : URL_REST_BASE + "user/adm/read",
        	
        	editUsuario : URL_REST_BASE + "user/adm/edit",
        	
        	verDirecciones: URL_REST_BASE + "user/adm/dir",
        	
        	nuevaDireccion : URL_REST_BASE + "user/adm/dir",
        	
        	actualizarDireccion : URL_REST_BASE +"user/adm/dir/",
        	 
        	eliminarDireccion :  function (idDireccion){
        		return URL_REST_BASE + 'user/adm/dir/'+ idDireccion ;
        	},
        	
        	crearPedidoIndividual: URL_REST_BASE + 'user/pedido/individual',
        	
        	verPedidoIndividual: function (idVendedor){
        		return URL_REST_BASE + 'user/pedido/individual/'+ idVendedor ;
        	},
        	
        	agregarPedidoIndividual: URL_REST_BASE+  'user/pedido/individual',
        	        	
        	confirmarPedidoIndividual: URL_REST_BASE+'user/pedido/confirmar',
        	
        	pedidoIndividual:function (id){
        		return 	URL_REST_BASE+ 'user/pedido/individual/'+id;
        	},
        	
        	notificacionesNoLeidas: URL_BASE_MOCK + "user/adm/notificacion/noLeidas",
        	
        	notificacionesLeidas: function(pagina){
        		return URL_BASE_MOCK + "user/adm/notificacion/"+pagina;
        	},

        	productosDestacadosByVendedor : function(idVendedor){
        		return URL_REST_BASE +"client/producto/destacados/"+idVendedor;
        	},
        	/*
            productosDestacadosByVendedor : function(idVendedor){
              return "http://localhost:8081/chasqui/rest/"  + "client/producto/destacados/"+idVendedor;
            },*/


        	////////////////////////////////////////////////////////
       
        	productosPedidoByUser : function(idUser){
        		return URL_BASE_MOCK + "productos/pedidos/usuario/"+idUser;
        	},
        	
        	productosQuitar : function(idUser,idPedido,cantidad){        								               
        		return URL_BASE_MOCK + "productos/pedido/"+idPedido+"/usuario/" +idUser+"/quitarProducto/"+cantidad;
        	},
        	
        	productosAgregar : function(idUser,idPedido,cantidad){        								               
        		return URL_BASE_MOCK + "productos/pedido/"+idPedido+"/usuario/" +idUser+"/agregarProducto/"+cantidad;
        	}, 
        		        		
        	gruposByusuario: function (idUser) {
        		return URL_BASE_MOCK + "usuarios/" +idUser + "/grupos/";
        	},
        
        	salirGrupo: function (idUser,idGrupo){
        		return URL_BASE_MOCK + "usuarios/"+idUser+"/grupos/"+idGrupo+"/salir";
        	},
        	
        	integrantesGrupo :function (idGrupo){
        		return URL_BASE_MOCK + "usuarios/grupos/"+idGrupo+"/integrantes";
        	}, 
        	
        	direccionGrupo : function (idGrupo){
        		return URL_BASE_MOCK + "direccion/grupo/"+idGrupo +"/";
        	},      
        	
        	direccionUsuario : function (idUsuario){
        		return URL_BASE_MOCK + "direccion/usuario/"+idUsuario;
        	}
        }
    
    }()
    );

})();
