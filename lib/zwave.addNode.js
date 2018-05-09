var shared = require('./zwave.shared.js');
var Promise = require('bluebird');
var inclusionMode = false;

module.exports = function addNode() {
    if(!inclusionMode){
        inclusionMode = true;
        return add();
    } else {
        inclusionMode = false;
        shared.zwave.cancelControllerCommand();
        return Promise.resolve();
    }
}

function add(){
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
    var zwave = shared.zwave;

    if (zwave.hasOwnProperty('beginControllerCommand')) {
        // using legacy mode (OpenZWave version < 1.3) - no security
        zwave.beginControllerCommand('AddDevice', true);
    } else {
        // using new security API
        // set this to 'true' for secure devices eg. door locks
        zwave.addNode(false);
    }
    
    return Promise.resolve();
}