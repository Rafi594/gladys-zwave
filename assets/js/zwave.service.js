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
        .factory('zwaveService', zwaveService);

    zwaveService.$inject = ['$http'];

    function zwaveService($http) {
        
        var service = {
            addNode: addNode,
            removeNode: removeNode,
            setNodeName: setNodeName,
            healNetwork: healNetwork
        };

        return service;
        
        function addNode() {
            return $http({method: 'POST', url: '/zwave/addnode' });
        }

        function removeNode(id) {
            return $http({method: 'DELETE', url: '/zwave/removenode/' + id});
        }

        function setNodeName(options) {
            return $http({method: 'PATCH', url: '/zwave/setnodename', data: options});
        }

        function healNetwork() {
            return $http({method: 'POST', url: '/zwave/healnetwork'});
        }
    }
})();