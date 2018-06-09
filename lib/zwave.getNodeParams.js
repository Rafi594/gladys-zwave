var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function removeNode(options) {
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;

    shared.setupMode = true
    shared.currentSetupId = options.id
    zwave.requestAllConfigParams(options.id)
    
    return Promise.resolve();
}