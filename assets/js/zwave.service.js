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
        .factory('zwaveService', ZwaveService);

    ZwaveService.$inject = ['$http', 'Notification', '$translate'];

    function ZwaveService($http, Notification, $translate) {
        
        var service = {
            addNode: addNode,
            removeNode: removeNode,
            getNodeParams: getNodeParams,
            setNodeName: setNodeName,
            healNetwork: healNetwork,
            setNodeParam: setNodeParam,
            softReset: softReset,
            setup: setup,
            getPorts: getPorts,
            setPort: setPort,
            successNotificationTranslated: successNotificationTranslated,
            errorNotificationTranslated: errorNotificationTranslated
        };

        return service;
        
        function addNode() {
            return $http({method: 'POST', url: '/zwave/addnode' });
        }

        function removeNode() {
            return $http({method: 'DELETE', url: '/zwave/removenode'});
        }

        function getNodeParams(id) {
            return $http({method: 'GET', url: '/zwave/getnodeparams/' + id});
        }

        function setNodeName(options) {
            return $http({method: 'PATCH', url: '/zwave/setnodename/', data: options});
        }

        function healNetwork() {
            return $http({method: 'POST', url: '/zwave/healnetwork' });
        }

        function setNodeParam(options) {
            return $http({method: 'PATCH', url: '/zwave/setnodeparam/', data: options});
        }

        function softReset() {
            return $http({method: 'GET', url: '/zwave/softreset/'});
        }

        function setup() {
            return $http({method: 'GET', url: '/zwave/setup/'});
        }

        function getPorts() {
            return $http({method: 'GET', url: '/zwave/getports/'});
        }

        function setPort(options) {
            return $http({method: 'PATCH', url: '/zwave/setport/', data: options});
        }

        function successNotificationTranslated(key, complement){
            return $translate(key)
                .then(function (text) {
                    if(complement) text += complement;
                    Notification.success(text); 
                });
        }
        
        function errorNotificationTranslated(key, complement){
            return $translate(key)
                .then(function (text) {
                    if(complement) text += complement;
                    Notification.error(text); 
                });
        }
    }
})();