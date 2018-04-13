var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function healNetwork() {
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;

    zwave.healNetwork(); 
    return Promise.resolve();
}