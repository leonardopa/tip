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
				vm.user = addAvatarHarcod(vm.user);
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
        

        /////////// HARCODEO AVATAR para pruebas
        function addAvatarHarcod(usuario){
        	usuario.extension=".jpg";
        	usuario.avatar="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";
        	return usuario;
        }
	}
    

})();
