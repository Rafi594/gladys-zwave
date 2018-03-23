/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
    
(function () {
    'use strict';

    angular
        .module('gladys')
        .controller('ZwaveCtrl', ZwaveCtrl);

    ZwaveCtrl.$inject = ['$scope'];

    function ZwaveCtrl($scope) {
        /* jshint validthis: true */
        var yet = this;
        yet.devices = {}
        
        activate();

        function activate() {
            io.socket.on('zwave', function (device) {                
                $scope.$apply(function(){
                    //yet.devices = device
                });                
                console.log(device)
            });
        }      
    }
})();