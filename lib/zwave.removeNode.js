var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function removeNode() {
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;

    if (zwave.hasOwnProperty('beginControllerCommand')) {
        // using legacy mode (OpenZWave version < 1.3) - no security
        zwave.beginControllerCommand('RemoveDevice');
    } else {
        // using new security API
        zwave.removeNode();
    }

    return zwave.on('node removed', function(nodeid){
        var options = {
            identifier: nodeid,
            service: "zwave"
        }
    
        return gladys.device.getByIdentifier(options)
            .then(function(data) {
                gladys.device.delete(data.id)
                    .then(() => {
                        return Promise.resolve(nodeid);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    })

            })

        zwave.cancelControllerCommand();
    })
}