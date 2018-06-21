const shared = require('./zwave.shared.js')
const Promise = require('bluebird')
const init = require('./zwave.init.js')

module.exports = function softReset() {
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));

    shared.zwave.softReset();
    sails.log.info(`Zwave module : Restarting controller... `)
    init()
    return Promise.resolve();
}