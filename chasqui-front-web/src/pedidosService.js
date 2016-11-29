angular.module('chasqui').service('pedidosService', pedidos_service);

function pedidos_service () {

this.


}


















app.service('tareasService', function($http) {
    this.findAll = function(callback) {
        $http.get('/tareas').then(callback);
    }
});


app.controller('TareasController', function(tareasService) {
    var self = this;

    this.getTareas = function() {
        tareasService.findAll(function(response) {
            self.tareas = response.data;
        });
    }    

    this.getTareas();
});







    