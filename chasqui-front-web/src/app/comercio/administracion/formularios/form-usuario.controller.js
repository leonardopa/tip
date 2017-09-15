(function() {
	'use strict';

	angular.module('chasqui').controller('FormUsuarioController',
		FormUsuarioController);

	/**
	 * @ngInject Formulario para crear un grupo
	 */
	function FormUsuarioController($log, $state,
		ToastCommons, StateCommons, $scope, $timeout, perfilService,
		us) {
		$log.debug("controler FormUsuarioController", $scope.perfil);

		var vm = this;

		vm.user = {};
		vm.passVerificacion;

		vm.isAlta = $scope.perfil != true; // si crea un usuario nuevo o es un
		// update. Si viene de perfil es
		// UPDATE
		vm.readOnly = !vm.isAlta; // si es alta siempre false, sino depende el
		// modo.
		vm.isModoEdit = false;

		vm.user.telefonoFijo = "";
		vm.user.telefonoFijo = "";

		function mostrarMensajesDeBienvenida() {

			$timeout(function() {
				ToastCommons.mensaje(us.translate('BIENVENIDO'));
			}, 3000);

			$timeout(function() {
				ToastCommons.mensaje(us.translate('INGRESA_MSG'));
			}, 10000);

			$timeout(function() {
				ToastCommons.mensaje(us.translate('CORREO_MSG'));
			}, 15000);

			$timeout(function() {
				ToastCommons.mensaje(us.translate('COMPL_PERFIL_MSG'));
			}, 30000);
		}

		vm.init = function() {
			if (!vm.isAlta) {
				vm.callVerUsuario();
			}
		}

		vm.user.telefonoFijo = "",
		vm.user.telefonoFijo = ""
		vm.guardar = function() {
			vm.callGuardar();
		}

		vm.actualizar = function() {
			$log.debug("Actualizar usuario", vm.user);

			vm.callActualizarUsuario();
            vm.callActualizarAvatar();

			vm.readOnly = true;
			vm.isModoEdit = false;
		}

		vm.edit = function() {
			$log.debug("click edit usuarrio");
			vm.readOnly = false;
			vm.isModoEdit = true;
		}

		vm.noActualizar = function() {
			$log.debug("click NO edit usuarrio");
			vm.readOnly = true;
			vm.isModoEdit = false;

			vm.callVerUsuario();
		}
		// ///////// llamadas

		vm.callVerUsuario = function() {

			function doOk(response) {
				$log.debug("callVerUsuario", response);
				vm.user = response.data;
			}
			perfilService.verUsuario().then(doOk);

		}

		vm.callActualizarUsuario = function() {

			function doOk(response) {
				ToastCommons.mensaje(us.translate('ACTUALIZO_PERFIL_MSG'));
			}
			delete vm.user['direccion'];
			delete vm.user['email'];
		
			// TODO : manejar error
			// ToastCommons.mensaje('Falla actulizar. Ver Trello');
			if (vm.user['telefonoMovil'] !== null || vm.user['telefonoFijo'] !== null) {
				perfilService.editUsuario(vm.user).then(doOk)
			}
			
		}
        
        vm.callActualizarAvatar = function(){            
			function doOk(response) {
				//ToastCommons.mensaje(us.translate('ACTUALIZO_PERFIL_MSG'));
			}
                        
			perfilService.editAvatar(vm.avatar).then(doOk)
        }

		// usuaruo nuevo
		vm.callGuardar = function() {
			$log.debug("guardar usuario", vm.user);

			if (vm.user.password == vm.passVerificacion) {

				function doOk(response) {
					$log.debug("guardo usuario", response.data);

					mostrarMensajesDeBienvenida();

					StateCommons.ls.token = response.data.token;

					// $state.go("registro",{ "isPasoDomicilio" : true});
					// $rootScope.$broadcast("creo-usuario-nuevo", { user:
					// response.data });
					$scope.$emit("creo-usuario-nuevo", {
						user: response.data
					});

				}

				perfilService.singUp(vm.user).then(doOk)

			} else {
				$log.error("las contrasenas no coinciden");
				// TODO: enviar mensaje
				ToastCommons.mensaje(us.translate('PASS_INCORRECTO_MSG'))
			}
		}

		vm.init();
        
        /// Avatar
        
        vm.avatar = {};
        
        function resizeAvatar(id, img, maxWidth, maxHeight){
            
            var img_avatar = new Image();
            img_avatar.onload = function() {
                var canvas_resize = document.createElement("canvas");
                var width, height, sourceX, sourceY = 0;
                
                width = this.width;
                height = this.height;
                console.log("onload: ", "Width: ", width, ", Heigth: ", height);
                console.log("Avatar url: ", this.src);

                if(width/maxWidth > height/maxHeight){
                    console.log("max width, ", width * maxHeight / height);
                    width = Math.ceil(width * maxHeight / height);
                    height = maxHeight;
                    sourceX = Math.ceil((width - maxWidth) / 2);
                }else{
                    console.log("max height, ", height * maxWidth / width);
                    height = Math.ceil(height * maxWidth / width);  
                    width = maxWidth;
                    sourceY = Math.ceil((height - maxHeight) / 2);
                }

                canvas_resize.width = width;
                canvas_resize.height = height;
                var ctx_resize = canvas_resize.getContext("2d");
                ctx_resize.drawImage(this, 0,       0,       width,    height);
                
                var img_avatar_resize = new Image();
                
                img_avatar_resize.onload = function() {
                    var canvas_crop = document.createElement("canvas");
                    canvas_crop.width = maxWidth;
                    canvas_crop.height = maxHeight;
                    var ctx_crop = canvas_crop.getContext("2d");
                    
                    //ctx_crop.drawImage(this, 0, 0, width, height); 
                    ctx_crop.drawImage(this, sourceX, sourceY, maxWidth, maxHeight, 
                                         0,       0,       maxWidth, maxHeight);
                    
                    document.getElementById(id).src = canvas_crop.toDataURL();    
                    console.log("cropted w: ", canvas_crop.width, "cropted h: ", canvas_crop.height, " img cropted:", document.getElementById(id)); 
                    
                    vm.avatar = {
                        extension: extensionDe(img.name),
                        avatar: base64data(document.getElementById("avatar").src)
                    };

                    console.log("Avatar cargado: ", vm.avatar);
                }
                console.log("resized w: ", canvas_resize.width, "resized h: ", canvas_resize.height, " img resized:", canvas_resize.toDataURL());
                img_avatar_resize.src = canvas_resize.toDataURL();
                
            };
            img_avatar.src = URL.createObjectURL(img);
        }
        
        
        $scope.cargarAvatar = function(element){
            $scope.$apply(function(scope) {
                console.log("Avatar: ", element.files[0]);
                resizeAvatar("avatar", element.files[0], 150, 150);
             });
        }
        
        
        function extensionDe(nombreDelArchivo){
            return nombreDelArchivo.substring(nombreDelArchivo.lastIndexOf('.'));
        }
        
        function base64data(img){
            return img.substring(img.lastIndexOf(",") + 1);
        }
        
	}
    

})();
