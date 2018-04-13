var shared = require('./zwave.shared.js');
var Promise = require('bluebird');
var device;

module.exports = function removeNode(nodeId) {
    sails.log.debug("Remove node")
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;
    getDevice(nodeId)

    if (zwave.hasOwnProperty('beginControllerCommand')) {
        // using legacy mode (OpenZWave version < 1.3) - no security
        zwave.beginControllerCommand('RemoveDevice');
        gladys.device.delete(device.id)
    } else {
        // using new security API
        zwave.removeNode();
        gladys.device.delete(device.id)
    }
    
    return Promise.resolve();
}

function getDevice(identifier){
    
    var options = {
        identifier: identifier,
        service: "zwave"
    }

    return gladys.device.getByIdentifier(options)
        .then(function(data) {
            device = data
        })
}