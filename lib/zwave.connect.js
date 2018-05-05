var shared = require('./zwave.shared.js');
var ZWave = require('openzwave-shared');
var zwave = new ZWave(shared.params);
shared.zwave = zwave;

var nodes = [];
var infosNodes = [];
var nodeParams = [];

module.exports = function connect() {

    return gladys.param.getValue(shared.gladysUsbPortParam)
        .then((usbPort) => {

            zwave.on('node added', function(nodeid) {
                nodes[nodeid] = {
                    manufacturer: '',
                    manufacturerid: '',
                    product: '',
                    producttype: '',
                    productid: '',
                    type: '',
                    name: '',
                    loc: '',
                    classes: {},
                    ready: false,
                };
            });

            zwave.on('value added', function(nodeid, comclass, value) {
                if (!nodes[nodeid]['classes'][comclass])
                    nodes[nodeid]['classes'][comclass] = {};
                nodes[nodeid]['classes'][comclass][value.index] = value;
        
                if(value.genre != "system" && value.genre != "config"){
                    var state = {
                        value: value.value
                    };
            
                    gladys.deviceState.createByDeviceTypeIdentifier(nodeid + shared.separator + comclass + shared.separator +  value.index, 'zwave', state)
                        .catch((err) => sails.log.warn(`Zwave Module : Fail to save deviceState : ${err}`));
                }
            });
        
            zwave.on('node ready', function(nodeid, nodeinfo) {

                if(!shared.setupMode){
                    getNodeInfos(nodeid, nodeinfo)
                }else{
                    shared.setupMode = false
                    gladys.socket.emit('nodeParams', nodeParams);
                    nodeParams = [];
                }
            });

            zwave.on('value changed', function(nodeid, comclass, value) {

                if(shared.setupMode){
                    nodeParams.push(value)
                }else{
                    if(value.genre != "system" && value.genre != "config"){
                        var state = {
                            value: value.value
                        };
                
                        gladys.deviceState.createByDeviceTypeIdentifier(nodeid + shared.separator + comclass + shared.separator +  value.index, 'zwave', state)
                            .catch((err) => sails.log.warn(`Zwave Module : Fail to save deviceState : ${err}`));
                    }
                }        
                
            });

            zwave.on('node event', function(nodeid, data) {
                sails.log.info(`Node event : ${nodeid} ${data}`);
            });

            zwave.on('scene event', function(nodeid, sceneid) {
                sails.log.info(`Scene event : ${nodeid} ${sceneid}`);
            });

            zwave.on('scan complete', function(){
                shared.nodesInfo = infosNodes
            })

            zwave.connect(usbPort);
        });
}

function getNodeInfos(nodeid, nodeinfo){

    var newNode = {
        info_node: {
            node_id: `${nodeid}`,
            manufacturer: `${nodeinfo.manufacturer}`,
            product: `${nodeinfo.product}`,
            name: `${nodeinfo.name}`,
            type: `${nodeinfo.type}`,
        },
    }

    if(!nodeinfo.name) nodeinfo.name = nodeinfo.type;

    var newDevice = {
        device: {
            name: `${nodeinfo.name}`,
            protocol: 'zwave',
            service: 'zwave',
            identifier: nodeid
        },
        types: []
    };

    for (comclass in nodes[nodeid]['classes']) {
        switch (comclass) {
            case 0x25: // COMMAND_CLASS_SWITCH_BINARY
            case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                zwave.enablePoll(nodeid, comclass);
                break;
        }

        var values = nodes[nodeid]['classes'][comclass];

        for (idx in values) {
            var type = values[idx].type;
            var min = values[idx].min;
            var max = values[idx].max;
            
            if (type == 'bool') {
                type = 'binary';
                min = 0;
                max = 1;
            }

            if(values[idx].genre != "system" && values[idx].genre != "config"){
                newDevice.types.push({
                    name: values[idx].label,
                    type: type,
                    identifier: nodeid + shared.separator + comclass + shared.separator + values[idx].index,
                    sensor: values[idx].read_only,
                    unit: values[idx].units,
                    min: min,
                    max: max,
                    display: false
                });
            }
        }
    }

    infosNodes.push(newNode)   

    gladys.device.create(newDevice)
        .catch((err) => sails.log.error(`Zwave module : Error while creating device : ${err}`));
}