const Promise = require('bluebird');
const connect = require('./zwave.connect.js')
const shared = require('./zwave.shared.js');
let zwave = shared.zwave;

module.exports = function(options) {

    //First get the id of zwave module 
    return getZwaveId()
        .then((id) => {
            options.zwaveId = id
            //Set the product id param
            sails.log.info('Zwave module: Setting the product id param')
            return setProductIdParam(options)
        })
        .then(() => {
            //And set the com name param
            sails.log.info('Zwave module: Setting the com name param')
            return setComParam(options)
        })
        .then(() => {
            //Finaly return success response and run connection
            sails.log.info('Zwave module: Running connection')
            if(zwave != null)zwave.removeAllListeners()
            connect()
            return Promise.resolve()
        })
};

function getZwaveId(){
    return gladys.module.get()
        .then(modules => {
            for(let module of modules){
                if(module.slug == 'zwave'){
                    return Promise.resolve(module.id)
                }
            }
        })
}

function setProductIdParam(options){

    var param = {
        name: shared.gladysProductIdParam,
        value: options.productId,
        type: 'hidden',
        module: options.zwaveId,
        description : 'This param is the product\'s id of zwave controller. He Is used for auto-detection of the com port'
   }
   
   return gladys.param.setValue(param)
        .then(function(){
            return Promise.resolve();
        })
        .catch(e => {
            sails.log.error(`Zwave module: Product id param not seted. Error ${e}`)
            return Promise.reject()
        })
}

function setComParam(options){
    
    var param = {
        name: shared.gladysUsbPortParam,
        value: options.comName,
        type: 'visible',
        module: options.zwaveId,
        description : 'This param is the com port of zwave controller.'
   }

   return gladys.param.setValue(param)
        .then(function(){
            return Promise.resolve();
        })
        .catch(e => {
            sails.log.error(`Zwave module: Com name param not seted. Error ${e}`)
            return Promise.reject()
        })

}
