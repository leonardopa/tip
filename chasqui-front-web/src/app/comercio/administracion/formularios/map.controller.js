angular.module('chasqui').controller('MapGeocoderController', ['$scope', '$rootScope', '$log', '$q','leafletData','StateCommons','ToastCommons', '$mdDialog',
    function($scope, $rootScope, $log, $q, leafletData, StateCommons,ToastCommons , $mdDialog) {
	/*-------------------------------
	 *------Variables Gobales--------
	 *------------------------------*/
		var vm = this;
		var vmap;
		vm.domicilio =  $scope.direccionParam;
		var deshabilitarBoton = true;
		$rootScope.isDisabled = true;
		$rootScope.mostrarBotones = true;
    	var blueIcon = L.icon({
    	    iconUrl: 'assets/images/map-marker-40.png',

    	    iconSize:     [51, 51],
    	    iconAnchor:   [0, 40],
    	    popupAnchor:  [24, -40] 
    	});
    	
    	var greenIcon = L.icon({
    	    iconUrl: 'assets/images/map-marker-40-green.png',

    	    iconSize:     [51, 51],
    	    iconAnchor:   [0, 40],
    	    popupAnchor:  [24, -40] 
    	});    	
    	
    	
		//guarda un httpRequest;
		var HttpClient = function() {
			//genera un httpGET request;
			this.get = function(aUrl, aCallback) {
				var anHttpRequest = new XMLHttpRequest();
				anHttpRequest.onreadystatechange = function() { 
					if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
						aCallback(anHttpRequest.responseText);
	            	}

				anHttpRequest.open( "GET", aUrl, true );            
				anHttpRequest.send( null );
			}
		}
		

		
		var calle;
		var altura;
		var partido;
		var latitud;
		var longitud;
		var codigo_postal;
		
		/*--------------------------------------
		 *------- Fin Variables Generales ------
		 *-------------------------------------*/
		
		/*
    	 * Controles del Pop up
    	 */

    	
    	function show(ev) {
      		    $mdDialog.show({
      		      controller: DialogController,
      		      contentElement: '#myDialog',
      		      parent: angular.element(document.body),
      		      targetEvent: ev,
      		      clickOutsideToClose: true
      		    }
      		    ).then(function() {
    		      }, function() {
    		      });
      		  };
        
      	 function showAlert(ev, mensaje) {
      		    $mdDialog.show(
      		      $mdDialog.alert()
      		        .parent(angular.element(document.querySelector('#popupContainer')))
      		        .clickOutsideToClose(true)
      		        .title('Se ha producido un error')
      		        .textContent(mensaje)
      		        .ariaLabel('Alert Dialog Demo')
      		        .ok('OK')
      		        .targetEvent(ev)
      		    );
      		  };

	 	function DialogController($scope, $rootScope, $mdDialog) {
	 		 	
	 		    $scope.hide = function() {
	 		      $mdDialog.hide();
	 		    };

	 		    $scope.cancel = function() {
	 		      $mdDialog.cancel();
	 		    };

	 		    $scope.answer = function(answer) {
	 		      $mdDialog.hide(answer);
	 		    };
	 	}
		
		$scope.isDisabled = function() {
		      return $rootScope.isDisabled;
		  };
		  
		$scope.mostrarBotonesEnMapa = function(){
			return $rootScope.mostrarBotones;
		};
		
		$scope.direccionCorrecta = function(){
			$rootScope.isDisabled = false;
			$mdDialog.hide();
		}
		
		$scope.direccionIncorrecta = function(){
			$rootScope.isDisabled = true;
			$mdDialog.hide();
		}
		
        leafletData.getMap().then(function(map) {
        	vmap=map;
        	var marker = null;
        	var group = new L.featureGroup([])
        	vmap.setView([-34.7739,-58.5520]);
        	vmap.setZoom(9);
        	
      	  $scope.mostrarMapaGeneral = function(ev) {
      		  	vmap.setView([vmap.getCenter().lat,vmap.getCenter().lng], 11);
        		$rootScope.mostrarBotones=false;
      		    $mdDialog.show({
      		      controller: DialogController,
      		      contentElement: '#myDialog',
      		      parent: angular.element(document.body),
      		      targetEvent: ev,
      		      clickOutsideToClose: true
      		    }).then(function() {
      		      }, function() {
      		      });
      		   
      		  };
        	//guarda una funcion para setear markers;
    		var agregarMarker = function() {
    			//funcion primaria para setear el Marker
    			this.setMarker = function(lat,lng){
    				if(marker == null){
    					 if(!vm.domicilio.predeterminada){
    						 marker = L.marker([lat,lng]).setIcon(blueIcon);
    					 }else{
    						 marker = L.marker([lat,lng]).setIcon(greenIcon);
    					 }
    					 this.markerPopUp(marker,lat,lng);
    					 return marker;
    				}else{
   					 if(!vm.domicilio.predeterminada){
     					marker.setLatLng([lat,lng]).setIcon(blueIcon);
					 }else{
						marker.setLatLng([lat,lng]).setIcon(greenIcon);
					 }
    					this.markerPopUp(marker,lat,lng);
    					return marker;
    				}
    			}
    			//Le agrega el PopUp al marker
    			this.markerPopUp = function(marker, lat,lng){
    				marker.bindPopup('<div align="center"> Alias: '+vm.domicilio.alias+'</div>'+
    								 '<div align="center"> Calle: '+vm.domicilio.calle+'</div>'+
    								 '<div align="center"> Altura: '+vm.domicilio.altura+'</div>'+
    								 '<div align="center"> Localidad: '+vm.domicilio.localidad+'</div>'+
    								 '<div align="center"> Latitud: '+vm.domicilio.latitud+'</div>'+
    								 '<div align="center"> Longitud: '+vm.domicilio.longitud+'</div>');
    				marker.on('click', function(e) {
    					//alert("hi. you clicked the marker at " + e.latlng);
    				});
    			}
    		}
    		
    		if(vm.domicilio != null && vm.domicilio.latitud != null){
    			new agregarMarker()
    			.setMarker(vm.domicilio.latitud,vm.domicilio.longitud)
    			.addTo(vmap);
    			
    			vmap.setView([vm.domicilio.latitud, vm.domicilio.longitud], 12);
    		}
    		
    		function marcar (ev){
        		new agregarMarker().setMarker(vmap.getCenter().lat,vmap.getCenter().lng)
        		.addTo(vmap)
        		.openPopup();
        		vmap.setView([vmap.getCenter().lat,vmap.getCenter().lng], 15);
        		reverseGeoCoding(ev);
    		}
    		
    		function mostrarMensaje(msj){
    			ToastCommons.mensaje(msj);
    		}
    		
        	$scope.localizar = function(ev){

        		$rootScope.mostrarBotones=true;
        		 if (navigator.geolocation) {
        	          navigator.geolocation.getCurrentPosition(function(position) {
        	            var pos = {
        	              lat: position.coords.latitude,
        	              lng: position.coords.longitude
        	            };
        	            vmap.setView(pos);
        	            vmap.setZoom(20);
        	            marcar(ev);
        	            //mostrarMensaje('Por favor verifique la dirección y la posición sean correctas')
        	          });
        	     }
        	}
        	
        	function loadproperties(){
        		vm.domicilio.calle = calle;
        		vm.domicilio.altura = altura;
        		vm.domicilio.localidad = partido;
        		vm.domicilio.latitud = latitud;
        		vm.domicilio.longitud = longitud;
        		if(codigo_postal != null){
        			vm.domicilio.codigoPostal = codigo_postal;
        		}
        		$scope.$apply();
        		
        	}
        	
        	function validateArrayWithElement(array,compare){
        		var ret = false;
        		for (i in array){
        			if(!ret){
        				ret = array[i] == compare;
        			}
        		}
        		return ret;
        	}        	
        	
        	function getJsonDataComponents(jsonArray){
        		for(i in jsonArray){
        			var index = i;
        			var value = jsonArray[index].types;
        			if(validateArrayWithElement(value,'street_number')){
        				altura = jsonArray[index].long_name;
        			}
        			
        			if(validateArrayWithElement(value,'postal_code')){
        				codigo_postal = jsonArray[index].long_name;
        			}
        			
        			if(validateArrayWithElement(value,'route')){
        				calle = jsonArray[index].long_name;
        			}
        			
        			if(validateArrayWithElement(value,'administrative_area_level_2')){
        				partido = jsonArray[index].long_name;
        			}
        			
        			if(validateArrayWithElement(value,'country')){
        				pais = jsonArray[index].long_name;
        			}
        			
        		}
        	}
        	
        	function reverseGeoCoding(ev){
        		var lat = marker.getLatLng().lat;
        		var lng = marker.getLatLng().lng;
        		aQuery = new HttpClient();
        		var httpquery = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyD_8mUpLuoMmB6qSW_kI3vQXY7jpvbfnB4';
        		console.log(httpquery);
        		aQuery.get(httpquery, function(response) {
        			if(JSON.parse(response).status == "OK"){
        				var jsonarray= JSON.parse(response).results[0].address_components;
        				var json= JSON.parse(response).results[0].geometry.location;
        				getJsonDataComponents(jsonarray);
            			latitud = json.lat;
            			longitud = json.lng;
        				loadproperties();
        				show(ev);
        			}else{
        				var mensaje = 'No se logro ubicar su posicion';
        				showAlert(ev,mensaje);
        				$log.debug('Error Map.controller.js en la funcion reverseGeoCoding()');
        				$log.debug(mensaje);
        			}
        		});        		
        	}
        	
        	 
        
        	
        	$scope.buscar = function(ev){
        		$rootScope.mostrarBotones=true;
    			
        		//Arma la query
        		encodedQuery=vm.domicilio.calle + '+' + vm.domicilio.altura + '+' + vm.domicilio.localidad + '+' + "Argentina";
        		aQuery = new HttpClient();
        		//Ejecuta la query y delega la respuesta (response) a la funcion anonima
        		aQuery.get('https://maps.googleapis.com/maps/api/geocode/json?address='+encodedQuery+'+&key=AIzaSyD_8mUpLuoMmB6qSW_kI3vQXY7jpvbfnB4', function(response) {
        			if(JSON.parse(response).status == "OK"){
        				var json= JSON.parse(response).results[0].geometry.location;
        				var jsonarray =JSON.parse(response).results[0].address_components
        				new agregarMarker().setMarker(json.lat,json.lng)
        				.addTo(vmap)        				
        				.openPopup();
        				getJsonDataComponents(jsonarray);
            			latitud = json.lat;
            			longitud = json.lng;
            			loadproperties();
        				vmap.setView([json.lat, json.lng], 15);  

        				
        				show(ev);        				
        			}else{
        				var mensaje = 'No se encontro la direccion '+ encodedQuery ;
        				showAlert(ev,mensaje);
        				$log.debug('Error Map.controller.js en la funcion $scope.buscar()');
        				$log.debug(mensaje);
        			}
        		});
            }
      });
        
    }
]);

