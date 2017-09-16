(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('ContextoPedidoController', ContextoPedidoController);

  /**
   *  FAB Button de contexto de compra.
   */
  function ContextoPedidoController($rootScope, $log, CTE_REST, StateCommons, gccService, us, productoService, $timeout, contextoCompraService) {

    $log.debug("ContextoPedidoController .....");


    var vm = this;

    /////////////////////////////////////////////////

    // Representa el conepto de grupo indivial para el caso de que no tiene un pedido abierto
    vm.urlBase = CTE_REST.url_base;
    vm.isLogued = StateCommons.isLogued();

    vm.pedidos = [];
    vm.pedidoSelected = contextoCompraService.ls.pedidoSelected;
    //	vm.grupoSelected=contextoCompraService.ls.grupoSelected;
    //vm.hayProductos=false;

    vm.checkAlias = function() {
      if (vm.pedidoSelected) {
        return vm.pedidoSelected.aliasGrupo == null ? 'Personal' : vm.pedidoSelected.aliasGrupo;
      } else {
        return ''
      }
    }

    function load() {
      contextoCompraService.refreshPedidos().then(
        function(pedidos) {
          vm.pedidos = pedidos;
          vm.pedidoSelected = contextoCompraService.ls.pedidoSelected;
        });
    }

    /*
    		$rootScope.$on('contexto.pedido.actualizar', 
    			function(event, grupo) {					
    				vm.pedidoSelected=contextoCompraService.ls.pedidoSelected;
    				//StateCommons.ls.pedidoSelected=vm.pedidoSelected;				
    			});
    */
    $rootScope.$on('contexto.compra.cambia.grupo',
      function(event, grupo) {
        $log.debug("on contexto.compra.cambia.grupo");
        //vm.pedidoSelected = contextoCompraService.ls.pedidoSelected;
        //StateCommons.ls.pedidoSelected=vm.pedidoSelected;				
        load();
      });

    //actualiza la lista de productos
    $rootScope.$on('lista-producto-agrego-producto',
      function(event) {
        $log.debug("on lista-producto-agrego-producto");
        load();
      });

    load();
  }
})();
