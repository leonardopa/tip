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

      //  var URL_BASE = "http://localhost:8081/chasqui/";
        var URL_BASE = "http://168.181.184.203:8080/chasqui/";
        
        var URL_REST_BASE = "http://localhost:8081/chasqui-mock/rest/";
    //    var URL_REST_BASE_2 = "http://168.181.184.203:8080/chasqui/rest/";
        
        var URL_REST_BASE_2 = URL_BASE+"rest/";
        
        //var URL_REST_BASE_2 = "http://proyectochasqui.com:8080/chasqui/rest/";
        //var URL_REST_BASE = "http://factory.epidata.com.ar:9145/chasqui-mock/rest/";
        
        var PRODUCTO = URL_REST_BASE + "productos/";
        
  //      var idVendedor = 4;

        //var nombreVendedor = 'adminpds';
        
        return {

       // 	idVendedor: idVendedor, //TODO : hasta que sea dinamico

       //     vendedor:  URL_REST_BASE_2+"client/vendedor/"+nombreVendedor,

            catalogo:  URL_REST_BASE_2+"client/catalogo", //Para que se deduzca de la URL
                 
        	url_base: URL_BASE,
        	
        	url_rest: URL_REST_BASE ,
        	
        	login: URL_REST_BASE_2+"client/sso/singIn",
        	
        	resetPass: function (email){
        		return URL_REST_BASE_2+"client/sso/resetPass/"+email ;
        	},
        	
        	singUp: URL_REST_BASE_2+"client/sso/singUp",
        	
        	categorias: function (idVendedor){
        		return URL_REST_BASE_2 +"client/categoria/all/" + idVendedor;
        	},
        	 
        	productores: function (idVendedor){
        		return URL_REST_BASE_2 +"client/productor/all/" + idVendedor;
        	},
        	
        	medallas: URL_REST_BASE_2 +"client/medalla/all", 
        	
        	medallasProducto: URL_REST_BASE_2 + "client/medalla/producto/all",
        	
        	medallasProductor : URL_REST_BASE_2 + "client/medalla/productor/all",
        	
        	medallaById: function (id){
        		return URL_REST_BASE_2 +"client/producto/medalla/idMedalla" + id; 
        	},
        	 
        	productosByCategoria: URL_REST_BASE_2 + "client/producto/byCategoria",
        	
        	productosByProductor: URL_REST_BASE_2 + "client/producto/byProductor",
        	
        	productosByMedalla: URL_REST_BASE_2+"client/producto/byMedalla",
        	
        	productosByQuery : URL_REST_BASE_2 + "client/producto/byQuery",
          	
        	verUsuario : URL_REST_BASE_2 + "user/adm/read",
        	
        	editUsuario : URL_REST_BASE_2 + "user/adm/edit",
        	
        	verDirecciones: URL_REST_BASE_2 + "user/adm/dir",
        	
        	nuevaDireccion : URL_REST_BASE_2 + "user/adm/dir",
        	
        	actualizarDireccion : URL_REST_BASE_2 +"user/adm/dir/",
        	 
        	eliminarDireccion :  function (idDireccion){
        		return URL_REST_BASE_2 + 'user/adm/dir/'+ idDireccion ;
        	},
        	
        	crearPedidoIndividual: URL_REST_BASE_2 + 'user/pedido/individual',
        	
        	verPedidoIndividual: function (idVendedor){
        		return URL_REST_BASE_2 + 'user/pedido/individual/'+ idVendedor ;
        	},
        	
        	agregarPedidoIndividual: URL_REST_BASE_2+  'user/pedido/individual',
        	
        	pedidoIndividual:function (id){
        		return 	URL_REST_BASE_2+ 'user/pedido/individual/'+id;
        	},
        	
        	////////////////////////////////////////////////////////
       

        	productosDestacadosByVendedor : function(idVendedor){
        		return URL_REST_BASE_2 +"client/producto/destacados/"+idVendedor;
        	},
        	
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
