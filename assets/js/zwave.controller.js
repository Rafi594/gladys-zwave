/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Mathieu Andrade
  */
    
 (function () {
    'use strict';

    angular
        .module('gladys')
        .controller('ZwaveCtrl', ZwaveCtrl);

    ZwaveCtrl.$inject = ['zwaveService', 'notificationService', '$scope'];

    function ZwaveCtrl(zwaveService, notificationService, $scope) {
        /* jshint validthis: true */
        var vm = this
        vm.addNode = addNode
        vm.healNetwork = healNetwork
        vm.setNodeName = setNodeName
        vm.removeNode = removeNode
        vm.setNodeParam = setNodeParam

        vm.nodes = []
        
        activate()

        function activate() {
            io.socket.on('zwave', function (nodes) {                
                $scope.$apply(function(){
                    vm.nodes = nodes
                    console.log(vm.nodes)
                });                
            });
        }
        
        function addNode(){
            return zwaveService.addNode()
                .then(function(result){
                    console.log(result)
                })
        }

        function removeNode(){
            return zwaveService.removeNode(10)
                .then(function(result){
                    console.log(result)
                })
        }

        function healNetwork(){
            return zwaveService.healNetwork()
                .then(function(result){
                    if(result.status == 200){notificationService.successNotification('Lancement de la guérison du réseau !')}
                    else{notificationService.errorNotification('Une erreur est survenue')}
                })
        }

        function setNodeName(nodeId, name){
            return zwaveService.setNodeName({nodeId: nodeId, name: name})
        }

        function setNodeParam(node){
            return zwaveService.setNodeParam(node)
                .then(function(result){
                    if(result.status == 200){notificationService.successNotification('Paramètres appliqués !');}
                    else{notificationService.errorNotification('Une erreur est survenue')}
                })
        }

    }
})();