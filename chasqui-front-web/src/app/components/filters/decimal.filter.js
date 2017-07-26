(function () {
    'use strict';
   
    /// var app = angular.module("cl.paging", []);

    angular.module("chasqui").filter('aDecimal', function(){
        return function(parteDecimal){
            var res = Number(parteDecimal).toFixed(0).toString();      
            if(res.length == 1) res+= "0";
            return res;
        };
    });
})