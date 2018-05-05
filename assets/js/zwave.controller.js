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

    ZwaveCtrl.$inject = ['zwaveService', '$scope'];

    function ZwaveCtrl(zwaveService, $scope) {
        /* jshint validthis: true */
        var vm = this
        vm.addNode = addNode
        vm.healNetwork = healNetwork
        vm.setNodeName = setNodeName
        vm.removeNode = removeNode
        vm.setNodeParam = setNodeParam
        vm.getNodeParams = getNodeParams
        vm.softReset = softReset

        vm.nodes = []
        vm.selectedNodeParams = [];
        vm.nodesReady = false
        vm.paramsReady = false
        vm.nodesIsEmpty = false
        
        activate()

        function activate() {

            timer(vm.nodes)
                .then(function(res){
                    $scope.$apply(function(){
                        vm.nodesIsEmpty = res
                    });
                })

            io.socket.on('nodes', function (nodes) {
                $scope.$apply(function(){
                    vm.nodes = nodes
                    if(vm.nodes.length == 0) vm.nodesIsEmpty = true
                    vm.nodesIsEmpty = false
                    vm.nodesReady = true
                });                
            });

            io.socket.on('nodeParams', function (params) {                
                $scope.$apply(function(){
                    vm.selectedNodeParams = params
                    vm.paramsReady = true
                });  
            });

            io.socket.on('addNode', function (node) {                
                $scope.$apply(function(){
                    vm.nodes.push(node)
                    $(".zwave-inclusionModal").modal("hide")
                });  
            });
            
        }
        
        function addNode(){
            return zwaveService.addNode()
                .then(function(result){
                    console.log(result)
                    if(result.status != 200){
                        zwaveService.errorNotificationTranslated('ERROR')
                        $(".zwave-inclusionModal").modal("hide")
                    }
                })
        }

        function removeNode(){
            return zwaveService.removeNode()
                .then(function(result){
                    console.log(result)
                    if(result.status == 200){
                        zwaveService.successNotificationTranslated('EXCLUDED_NODE')
                        //TODO: supprimer le noeud exclu de la liste
                    }else{zwaveService.errorNotificationTranslated('ERROR')}
                    $(".zwave-exclusionModal").modal("hide")
                })
        }

        function healNetwork(){
            return zwaveService.healNetwork()
                .then(function(result){
                    if(result.status == 200){zwaveService.successNotificationTranslated('HEALING_NETWORK')}
                    else{zwaveService.errorNotificationTranslated('ERROR')}
                })
        }

        function setNodeName(nodeId, name){
            return zwaveService.setNodeName({nodeId: nodeId, name: name})
                .then(function(result){
                    if(result.status == 200){zwaveService.successNotificationTranslated('NODE_NAME_UPDATED');}
                    else{zwaveService.errorNotificationTranslated('ERROR')}
                })
        }

        function setNodeParam(node){
            return zwaveService.setNodeParam(node)
                .then(function(result){
                    if(result.status == 200){zwaveService.successNotificationTranslated('SETTINGS_APPLIED');}
                    else{zwaveService.errorNotificationTranslated('ERROR')}
                })
        }
        
        function getNodeParams(id){
            vm.selectedNodeParams = []
            vm.paramsReady = false
            return zwaveService.getNodeParams(id)
                .then(function(result){
                    if(result.status == 200){
                        timer(vm.selectedNodeParams)
                            .then(function(res){
                                if(res == true) {
                                    $(".zwave-configModal").modal("hide")
                                    zwaveService.errorNotificationTranslated('ERROR')
                                }
                            })
                    }else{
                        $(".zwave-configModal").modal("hide")
                        zwaveService.errorNotificationTranslated('ERROR')
                    }
                })
        }

        function softReset(){
            return zwaveService.softReset()
                .then(function(result){
                    if(result.status == 200){zwaveService.successNotificationTranslated('RESTARTING');}
                    else{zwaveService.errorNotificationTranslated('ERROR')}
                })
        }

        function timer(options){
            return new Promise(function(resolve, reject) {
                setTimeout((function() {
                   if(options.length == 0 || options == null) resolve(true)
                   resolve(false)
               }), 30000);
            })
        }

    }
})();