var shared = require('./zwave.shared.js');
var Promise = require('bluebird');
var exclusionMode = false;

module.exports = function removeNode() {
    if(!exclusionMode){
        exclusionMode = true;
        remove();
        return Promise.resolve();
    } else {
        exclusionMode = false;
        shared.zwave.cancelControllerCommand();
        return Promise.resolve();
    }
}

function remove(){
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;

    if (zwave.hasOwnProperty('beginControllerCommand')) {
        // using legacy mode (OpenZWave version < 1.3) - no security
        zwave.beginControllerCommand('RemoveDevice');
    } else {
        // using new security API
        zwave.removeNode();
    }

    zwave.on('node removed', function(nodeid){
        var options = {
            identifier: nodeid,
            service: "zwave"
        }
    
         gladys.device.getByIdentifier(options)
            .then(function(data) {
                gladys.device.delete(device = {id: data.id})
                    .then(() => {
                        gladys.socket.emit('nodeRemoved', nodeid);
                    })

            })

        zwave.cancelControllerCommand();
    })
}