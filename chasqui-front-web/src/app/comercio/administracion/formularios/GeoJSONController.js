
angular.module('chasqui').controller('GeoJSONController', ['$scope', 'leafletData',
    function($scope, leafletData) {
        leafletData.getMap().then(function(map) {
            L.GeoIP.centerMapOnPosition(map, 15);




        });

   
   
 




    }



]);
