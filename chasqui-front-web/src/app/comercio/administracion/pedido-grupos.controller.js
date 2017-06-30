(function() {
	'use strict';

	angular.module('chasqui').controller('PedidoGruposController',
			PedidoGruposController);

	/**
	 * @ngInject Contenido del tab de grupo. Recibe por parametro el id del
	 *           grupo
	 */
	function PedidoGruposController($scope, StateCommons) {
		
		var vm = this;

		vm.grupo = $scope.grupo;
        
        vm.selfPara = function(miembro){
            return (miembro.email == StateCommons.ls.usuario.email) ? miembro.nickname + "(Tú)"  : miembro.nickname;
        }
        
        vm.vocativoPara = function(miembro){
            return (miembro.email == StateCommons.ls.usuario.email)?
                    "tuyos":
                    "de " + miembro.nickname;
        }
	}
})();
