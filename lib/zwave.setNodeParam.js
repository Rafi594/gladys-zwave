var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function setNodeParam(params) {
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;

    // foreach element in array
    return Promise.map(params, function(param){
        sails.log.info(`Zwave module : Setting value ${param.value} on param ${param.index} of node ${param.node_id}`)
        zwave.setConfigParam(param.node_id, param.index, param.value);
    });
 
    return Promise.resolve();
}