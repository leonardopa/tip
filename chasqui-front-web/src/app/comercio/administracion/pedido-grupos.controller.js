(function() {
  'use strict';

  angular.module('chasqui').controller('PedidoGruposController',
    PedidoGruposController);

  /**
   * @ngInject Contenido del tab de grupo. Recibe por parametro el id del
   *           grupo
   */
  function PedidoGruposController($scope, StateCommons, $log, perfilService, $mdDialog, gccService, us,ToastCommons) {
    $log.debug('PedidoGruposController', $scope.grupo);

    var vm = this;
    vm.grupo = $scope.grupo;
    vm.direcciones = [];
    vm.direccionSelected;
    vm.puedeCerrarPedidoGCC = !hayAlgunPedidoAbierto();

    vm.cerrarToolTipMsg = function() {
      if (vm.puedeCerrarPedidoGCC) {
        return "Podes cerrar el pedido grupal "
      } else {
        return "Para cerrar el pedido deben estar todos los pedidos confirmardos"
      }
    }

    vm.selfPara = function(miembro) {
      return (miembro.email == StateCommons.ls.usuario.email) ? miembro.nickname + "(Tú)" : miembro.nickname;
    }

    vm.vocativoPara = function(miembro) {
      return (miembro.email == StateCommons.ls.usuario.email) ?
        "tuyos" :
        "de " + miembro.nickname;
    }

    vm.miembrosActivosDelGrupo = function() {
      return vm.grupo.miembros.filter(function(m) { return m.invitacion == 'NOTIFICACION_ACEPTADA' });
    }

    vm.cerrarPedidoGccClick = function(ev) {
      $log.debug('cerrarPedidoGccClick');
      callConfirmar();
    }

    /****************/

    function hayAlgunPedidoAbierto() {
      var result = false;
      angular.forEach(vm.grupo.miembros, function(miembro) {
        if (!us.isUndefinedOrNull(miembro.pedido)) {
          result = miembro.pedido.estado == 'ABIERTO'
        }
      });
      return result;
    }

    /*************** */

    function callConfirmar() {
      $log.debug('callConfirmar   ', $scope.pedido);

      function doOk(response) {
        $log.debug("--- confirmar pedido response ", response.data);
        ToastCommons.mensaje(us.translate('PEDIDO_CONFIRMADO_MSG'));
        contextoCompraService.refreshPedidos().then(
          function(pedidos) {
            $state.reload();
          });
      }


      gccService.confirmarPedidoColectivo(vm.grupo.idGrupo).then(doOk)


    }
  }
})();
