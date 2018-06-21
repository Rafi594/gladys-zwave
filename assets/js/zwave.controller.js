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
        vm.getPorts = getPorts
        vm.setPort = setPort

        vm.nodes = []
        vm.selectedNodeParams = []
        vm.ports = []
        vm.selectedPort = null
        vm.nodesReady = false
        vm.paramsReady = false
        vm.nodesIsEmpty = false
        vm.timeLeft = 30

        var interval = null
        var timerCountDown
        
        activate()

        function activate() {

            io.socket.on('nodeParams', function (params) {                
                $scope.$apply(function(){
                    vm.selectedNodeParams = params
                    vm.paramsReady = true
                    clearInterval(interval)
                });  
            });

            io.socket.on('newNodes', function (node) {                
                $scope.$apply(function(){
                    vm.nodes.push(node)
                    $(".zwave-inclusionModal").modal("hide")
                    zwaveService.addNode()
                    clearTimeout(timerCountDown)
                });  
            });

            io.socket.on('nodeRemoved', function (node) {                
                $scope.$apply(function(){
                    var removeIndex = vm.nodes.map(function(item) { return item.id; }).indexOf(node);
                    vm.nodes.splice(removeIndex, 1)
                    $(".zwave-exclusionModal").modal("hide")
                    zwaveService.removeNode()
                    clearTimeout(timerCountDown)
                });  
            });

            zwaveService.setup()
                .then(function(result){
                    if(result.status != 200) zwaveService.errorNotificationTranslated('ERROR')
                    vm.nodes = result.data
                    if(vm.nodes.length == 0) {
                        vm.nodesIsEmpty = true
                    }else {
                        vm.nodesIsEmpty = false
                        vm.nodesReady = true
                        clearInterval(interval)
                    }
                })
            
        }
        
        function addNode(){
            return zwaveService.addNode()
                .then(function(result){
                    if(result.status != 200){
                        zwaveService.errorNotificationTranslated('ERROR')
                        $(".zwave-inclusionModal").modal("hide")
                    }else{
                        vm.timeLeft = 30
                        countdown($(".zwave-inclusionModal"), zwaveService.addNode);
                    }
                })
        }

        function removeNode(){
            return zwaveService.removeNode()
                .then(function(result){
                    if(result.status == 200){
                        vm.timeLeft = 30
                        countdown($(".zwave-exclusionModal"), zwaveService.removeNode);
                    }else{zwaveService.errorNotificationTranslated('ERROR')}
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

        function setNodeParam(){
            return zwaveService.setNodeParam(vm.selectedNodeParams)
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

        function getPorts(){
            return zwaveService.getPorts()
                .then(function(result){
                    if(result.status == 200){
                        vm.ports = result.data
                    }
                    else{zwaveService.errorNotificationTranslated('ERROR')}
                })
        }

        function setPort(){
            return zwaveService.setPort(vm.selectedPort)
                .then(function(result){
                    if(result.status == 200){zwaveService.successNotificationTranslated('SETTINGS_APPLIED');}
                    else{zwaveService.errorNotificationTranslated('ERROR')}
                })
        }

        function timer(options){
            return new Promise(function(resolve, reject) {
                interval = setInterval((function() {
                   if(options.length == 0 || options == null) resolve(true)
                   resolve(false)
               }), 30000);
            })
        }

        function countdown(modal, fun) {
            timerCountDown = setInterval((function() {
                if (vm.timeLeft == 0) {
                    clearTimeout(timerCountDown);
                    modal.modal("hide");
                    fun()
                } else {
                    $scope.$apply(function(){
                        vm.timeLeft--;
                    });  
                }
            }), 1000);
        }
    }
})();