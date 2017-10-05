(function() {
  'use strict';

  angular.module('chasqui', ['ngAnimate', 'ngCookies', 'ngTouch',
      'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router',
      'toastr', 'ngMaterial', 'ngStorage', 'ngMdIcons', 'pascalprecht.translate',
      'leaflet-directive', 'angular-loading-bar', 'angularMoment'
    ])

    /* https://material.angularjs.org/latest/Theming/03_configuring_a_theme */
    .config(function($mdThemingProvider) {
/*
      $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple')
        .accentPalette('amber')
        .warnPalette('red');
*/


      $mdThemingProvider.theme('default')
        .primaryPalette('blue',{
              'default': '700', // by default use shade 400 from the pink palette for primary intentions
              'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
              'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
              'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            }
          )
        .accentPalette('amber',{
              'default': '700', // by default use shade 400 from the pink palette for primary intentions
              'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
              'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
              'hue-3': 'A700' // use shade A100 for the <code>md-hue-3</code> class
            })
        .warnPalette('red');


      /** https://www.materialpalette.com/colors*/
/*      $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light', // whether, by default, text (contrast)
        // on this palette should be dark or light

        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
          '200', '300', '400', 'A100'
        ],
        'contrastLightColors': undefined // could also specify this if default was 'dark'
      });

      $mdThemingProvider.theme('default')
        .primaryPalette('amazingPaletteName')

*/
      /*
            $mdThemingProvider.theme('indigo')
              .primaryPalette('indigo')
              .accentPalette('pink');

            $mdThemingProvider.theme('lime')
              .primaryPalette('lime')
              .accentPalette('orange')
              .warnPalette('blue');

            $mdThemingProvider.theme('altTheme')
              .primaryPalette('purple')
              .accentPalette('green');*/

      // $mdThemingProvider.generateThemesOnDemand(true);
      //$mdThemingProvider.alwaysWatchTheme(true);
      // $mdThemingProvider.disableTheming();
    })

})();
