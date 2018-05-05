var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function softReset() {
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;

    zwave.softReset();

    return Promise.resolve();
}