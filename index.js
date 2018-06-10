
module.exports = function (sails) {

    var connect = require('./lib/zwave.connect.js');
    var disconnect = require('./lib/zwave.disconnect.js');
    var exec = require('./lib/zwave.exec.js');
    var setup = require('./lib/zwave.setup.js');
    var zwaveInstance = require('./lib/zwave.shared.js').zwave;
    var ZwaveController = require('./controller/ZwaveController.js');

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
            before: {
                'post /zwave/addnode': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
                'delete /zwave/removenode': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
                'get /zwave/getnodeparams/:id': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
                'patch /zwave/setnodename': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
                'post /zwave/healnetwork': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
                'patch /zwave/setnodeparam': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
                'get /zwave/softreset': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
                'get /zwave/setup': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next)
            },
            after: {
                'post /zwave/addnode': ZwaveController.add,
                'delete /zwave/removenode': ZwaveController.remove,
                'get /zwave/getnodeparams/:id': ZwaveController.getParams,
                'patch /zwave/setnodename': ZwaveController.setName,
                'post /zwave/healnetwork': ZwaveController.heal,
                'patch /zwave/setnodeparam': ZwaveController.setParam,
                'get /zwave/softreset': ZwaveController.reset,
                'get /zwave/setup': ZwaveController.setup,
            }
        }
    };
};