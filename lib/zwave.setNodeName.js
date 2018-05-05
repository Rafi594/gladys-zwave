var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function setNodeName(options) {
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;

    zwave.setNodeName(options.nodeId, options.name);
    return Promise.resolve();
}