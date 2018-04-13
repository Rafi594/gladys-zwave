
module.exports = function (sails) {

    var connect = require('./lib/zwave.connect.js');
    var disconnect = require('./lib/zwave.disconnect.js');
    var exec = require('./lib/zwave.exec.js');
    var setup = require('./lib/zwave.setup.js');
    var zwaveInstance = require('./lib/zwave.shared.js').zwave;
    var zwaveController = require('./controller/zwaveController.js');

    gladys.on('ready', function(){
        connect();
    });

    return {
        connect,
        disconnect,
        exec,
        setup,
        zwaveInstance,
        routes: {
            after: {
                'post /zwave/addnode': zwaveController.add,
                'delete /zwave/removenode/:id': zwaveController.remove,
                'patch /zwave/setnodename': zwaveController.setName,
                'post /zwave/healnetwork': zwaveController.heal,
            }
        }
    };
};