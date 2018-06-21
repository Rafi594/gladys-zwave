var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function setup(){
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));

    return Promise.resolve(shared.nodesInfo)
}