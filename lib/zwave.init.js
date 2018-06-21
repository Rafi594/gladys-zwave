const Promise = require('bluebird')
const getPorts = require('./zwave.getPorts.js')
const setPort = require('./zwave.setPort.js')
const shared = require('./zwave.shared.js')
let controller = {}

module.exports = function init(){

    return getProductIdParam()
        .then((productId) => {
            controller.productId = productId
            return getPorts()
        })
        .then((ports) => {
            return getComName(ports)
        })
        .then(() => {
            return setPort(controller)
        })

}

function getProductIdParam(){
    return gladys.param.getValue(shared.gladysProductIdParam)
        .then((productId) => {
            return Promise.resolve(productId)
        })
        .catch(() => {
            sails.log.error('Zwave module: Please complete the configuration\'s controller in configuration view')
            return Promise.reject()
        })
}

function getComName(ports){
    for(let port of ports){
        if(port.productId == controller.productId){
            controller = port
            return Promise.resolve()
        }
    }
}