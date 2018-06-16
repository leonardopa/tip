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

        .constant('CTE_REST', function() {

            var URL_BASE_MOCK = "";
            var URL_BASE = "";

            switch (1) {

                //    Servidor LOCAL
                case 0:
                    URL_BASE_MOCK = "http://localhost:8080/chasqui/rest/";
                    break;
                case 1:
                    URL_BASE = "http://localhost:8080/chasqui/";
                    break;
                case 11:
                    URL_BASE = "http://localhost:8080/chasqui/";
                    break;

                    //    Servidores REMOTOS
                case 2:
                    URL_BASE_MOCK = "http://168.181.184.203:8080/chasqui-mock/rest/";
                    break;
                case 3:
                    URL_BASE = "http://proyectochasqui.com:8080/chasqui-dev-testing/";
                    break;
                case 4:
                    URL_BASE = "http://69.61.93.156/panel-chasqui/";
                    break;

            }






            var URL_REST_BASE = URL_BASE + "rest/";

            var PRODUCTO = URL_REST_BASE + "productos/";

            var idVendedor = 2;

            var nombreVendedor = 'adminpds';



            return {
                PRODUCTOS_X_PAG: 12,

                INTERVALO_NOTIFICACION_MIN: 10*60000,

                TIEMPO_MAX_CACHE : 1 * 60,

                defaultLogo: "imagenes/logo_ch_login.png",

                idVendedor: idVendedor, //TODO : hasta que sea dinamico

                vendedor: URL_REST_BASE + "client/vendedor/" + nombreVendedor,

                catalogo: URL_REST_BASE + "client/catalogo", //Para que se deduzca de la URL

                url_base: URL_BASE,

                url_rest: URL_REST_BASE,

                login: URL_REST_BASE + "client/sso/singIn",

                resetPass: function(email) {
                    return URL_REST_BASE + "client/sso/resetPass/" + email;
                },

                singUp: URL_REST_BASE + "client/sso/singUp",

                categorias: function(idVendedor) {
                    return URL_REST_BASE + "client/categoria/all/" + idVendedor;
                },

                productores: function(idVendedor) {
                    return URL_REST_BASE + "client/productor/all/" + idVendedor;
                },

                // productosSinFiltro: URL_REST_BASE + "client/producto/sinFiltro",

                productosSinFiltro: function(idVendedor) {
                    return URL_REST_BASE + "client/producto/sinFiltro";
                },

                medallas: URL_REST_BASE + "client/medalla/all",

                imagenProducto: function(idVariante) {
                    return URL_REST_BASE + "client/producto/images/" + idVariante;
                },

                medallasProducto: URL_REST_BASE + "client/medalla/producto/all",

                medallasProductor: URL_REST_BASE + "client/medalla/productor/all",

                medallaById: function(id) {

                    return URL_REST_BASE + "client/producto/medalla/idMedalla/" + id;

                },

                productosByCategoria: URL_REST_BASE + "client/producto/byCategoria",

                productosByProductor: URL_REST_BASE + "client/producto/byProductor",

                productosByMedalla: URL_REST_BASE + "client/producto/byMedalla",

                productosByMedallaProductor: URL_REST_BASE + "client/producto/byMedallaProductor",

                productosByQuery: URL_REST_BASE + "client/producto/byQuery",

                verUsuario: URL_REST_BASE + "user/adm/read",

                editUsuario: URL_REST_BASE + "user/adm/edit",
                
                editAvatar: URL_REST_BASE + "user/adm/avatar",

                verDirecciones: URL_REST_BASE + "user/adm/dir",

                nuevaDireccion: URL_REST_BASE + "user/adm/dir",

                actualizarDireccion: URL_REST_BASE + "user/adm/dir/",

                eliminarDireccion: function(idDireccion) {
                    return URL_REST_BASE + 'user/adm/dir/' + idDireccion;
                },

                crearPedidoIndividual: URL_REST_BASE + 'user/pedido/individual',

                verPedidoIndividual: function(idVendedor) {
                    return URL_REST_BASE + 'user/pedido/individual/' + idVendedor;
                },

                agregarPedidoIndividual: URL_REST_BASE + 'user/pedido/individual/agregar-producto',

                confirmarPedidoIndividual: URL_REST_BASE + 'user/pedido/individual/confirmar',

                quitarProductoIndividual: URL_REST_BASE + "user/pedido/individual/eliminar-producto",

                cancelarPedidoIndividual: function(idPedido) {
                    return URL_REST_BASE + "user/pedido/individual/" + idPedido;
                },

                pedidoIndividual: function(id) {
                    return URL_REST_BASE + 'user/pedido/individual/' + id;
                },

                notificacionesNoLeidas: URL_REST_BASE + "user/adm/notificacion/noLeidas",

                notificacionesLeidas: function(pagina) {
                    return URL_REST_BASE + "user/adm/notificacion/" + pagina;
                },

                productosDestacadosByVendedor: function(idVendedor) {
                    return URL_REST_BASE + "client/producto/destacados/" + idVendedor;
                },

                gruposByusuario: function(idVendedor) {
                    return URL_REST_BASE + 'user/gcc/all/' + idVendedor;
                },

                aceptarInvitacionAGrupo: URL_REST_BASE + 'user/gcc/aceptar',

                rechazarInvitacionAGrupo: URL_REST_BASE + 'user/gcc/rechazar',

                nuevoGrupo: URL_REST_BASE + "user/gcc/alta/",

                editarGrupo: function(idGrupo) {
                    return URL_REST_BASE + "user/gcc/editarGCC/" + idGrupo;
                },

                crearPedidoGrupal: URL_REST_BASE + "user/gcc/individual",

                pedidosByUser: function(idVendedor) {
                    return URL_REST_BASE + 'user/gcc/pedidos/' + idVendedor;
                },

                invitarUsuarioAGrupo: URL_REST_BASE + "user/gcc/invitacion",

                quitarMiembro: URL_REST_BASE + "user/gcc/quitarMiembro",

                confirmarPedidoColectivo: URL_REST_BASE + "user/gcc/confirmar",

                confirmarPedidoIndividualGcc: URL_REST_BASE + "user/pedido/individualEnGrupo/confirmar",

                ////////////////////////////////////////////////////////
                /*    
                        productosPedidoByUser : function(idUser){
                            return URL_BASE_MOCK + "";
                        },



                        
                        productosQuitar : function(idUser,idPedido,cantidad){                                                      
                            return URL_BASE_MOCK + "productos/pedido/"+idPedido+"/usuario/" +idUser+"/quitarProducto/"+cantidad;
                        },
                        
                        productosAgregar : function(idUser,idPedido,cantidad){                                                     
                            return URL_BASE_MOCK + "productos/pedido/"+idPedido+"/usuario/" +idUser+"/agregarProducto/"+cantidad;
                        }, 
                                            
                        // gruposByusuario: function (idUser) {
                        //  return URL_BASE_MOCK + "usuarios/" +idUser + "/grupos/";
                        // },
                         



                        
                        
                        integrantesGrupo :function (idGrupo){
                            return URL_BASE + "usuario/grupos/"+idGrupo+"/integrantes";// DESMOCKEADO POR FAVIO 13-6
                        }, 
                        
                        direccionGrupo : function (idGrupo){
                            return URL_BASE + "direccion/grupo/"+idGrupo +"/";// DESMOCKEADO POR FAVIO 13-6
                        },      
                        
                        direccionUsuario : function (idUsuario){
                            return URL_BASE + "direccion/usuario/"+idUsuario;// DESMOCKEADO POR FAVIO 13-6
                        },
                     
                         */
                //////////////////////////////////////////////////////////
                //////////////// OTRAS CONSTANTES 
          
                ///// contantes de mensajes de errores conocidos
                ERROR_YA_TIENE_PEDIDO: "ya posee un pedido vigente"
            }

        }());

})();
