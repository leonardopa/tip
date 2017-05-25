(function() {
  'use strict';

  angular
    .module('chasqui')
    .controller('DemoController',DemoController);

  /** @ngInject 
   * Es solo un lugar para hacer pruebas*/
  function DemoController( $log ,StateCommons,$mdDialog,$controller) {
	  $log.debug('DemoController ..... ') 
 	
	   var vm = this
	   vm.mensaje = "Esto es una pagina DEMO para pruebas varias";
	 
	  //////////////// DIALOG CUSTOM
	  
	  vm.showAdvanced = function(ev) {
		    $mdDialog.show({
		      controller: 'DemoDialogController',
		      templateUrl: '/app/comercio/demo/dialog1.tmpl.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen:false // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		       $mdDialog.hide();
		    }, function() {
		       //vm.mensaje = 'You cancelled the jackInTheBox.';
		    });
		  };
		  

	  /////////////////// animaciones
	  vm.cambiarClase=function(){
	  	if (vm.class == undefined){
	  		vm.class = "hinge animated"
	  	}else{
	  		vm.class = undefined;
	  	}
	  }

	  /////////////////// animacion de carrousel
	  var cantidadImagenes =3;
	  var posicionImagenActual =1;
	  vm.show1=true;
	  vm.show2=true;
	  vm.show3=false;
	  
	  vm.cambiarShow=function(){
	  	vm.show= !vm.show;
	  }

	  vm.cambiarImagen=function(){
	  	if(posicionImagenActual==1){
	  		console.log(1);
	  	//	vm.class1 = "fadeIn animated"
	  	//	vm.class2 = "fadeOut animated"	
	  		vm.show1=true;
	    	vm.show2=false;
	  	  	
	  		posicionImagenActual=2;
		
	  	}else{
		  	console.log(2);
		  	//vm.class2 = "slideInRight animated"			  	
	  	//	vm.class1 = "fadeOut animated"
	  	//	vm.class2 = "fadeIn animated"	  	
		  	vm.show1=false;
			vm.show2=true;
			posicionImagenActual=1;
		}
	  }
	  
	  vm.dataArray = [
      {
        src: 'https://www.travelexcellence.com/images/movil/La_Paz_Waterfall.jpg'
      },
      {
        src: 'http://www.parasholidays.in/blog/wp-content/uploads/2014/05/holiday-tour-packages-for-usa.jpg'
      },
      {
        src: 'http://clickker.in/wp-content/uploads/2016/03/new-zealand-fy-8-1-Copy.jpg'
      },
      {
        src: 'http://images.kuoni.co.uk/73/indonesia-34834203-1451484722-ImageGalleryLightbox.jpg'
      },
      {
        src: 'http://www.holidaysaga.com/wp-content/uploads/2014/09/Day08-SIN-day-Free-City-View.jpg'
      },
      {
        src: 'http://images.kuoni.co.uk/73/malaysia-21747826-1446726337-ImageGalleryLightbox.jpg'
      },
      {
        src: 'http://www.kimcambodiadriver.com/uploads/images/tours/kim-cambodia-driver-angkor-wat.jpg'
      },
      {
        src: 'https://www.travcoa.com/sites/default/files/styles/flexslider_full/public/tours/images/imperialvietnam-halong-bay-14214576.jpg?itok=O-q1yr5_'
      }
    ];

  }
})();
