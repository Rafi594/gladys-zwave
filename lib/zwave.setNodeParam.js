var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function setNodeParam(node) {
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;

    // foreach element in array
    return Promise.map(node.params, function(param){
        // separate identifier
        var paramId = param.identifier.split(shared.separator);
        zwave.setConfigParam(node.info_node.node_id, paramId[1], param.value);
    });
 
    return Promise.resolve();
}