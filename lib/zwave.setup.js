var shared = require('./zwave.shared.js');
var inclusionMode = false;
var nodes = [];

module.exports = function setup(){

    return gladys.param.getValue(shared.gladysUsbPortParam)
        .then((usbPort) => {
            shared.zwave.disconnect(usbPort);
            shared.zwave.connect(usbPort);

            shared.zwave.on('node added', function(nodeid) {
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

            shared.zwave.on('value added', function(nodeid, comclass, valueId) {
                if (!nodes[nodeid]['classes'][comclass])
                    nodes[nodeid]['classes'][comclass] = {};
                nodes[nodeid]['classes'][comclass][valueId.index] = valueId;
            });

            shared.zwave.on('node ready', function(nodeid, nodeinfo) {

                var node = {
                    info_node: {
                        manufacturer: `${nodeinfo.manufacturer}`,
                        product: `${nodeinfo.product}`,
                        name: `${nodeinfo.name}`,
                        type: `${nodeinfo.type}`,
                    },
                    params: []
                }
        
                for (comclass in nodes[nodeid]['classes']) {
        
                    var values = nodes[nodeid]['classes'][comclass];
        
                    for (idx in values) {
                        
                        if(values[idx].genre != "user"){
                            
                            node.params.push({
                                index: values[idx].index,
                                name: values[idx].label,
                                type: values[idx].type,
                                identifier: nodeid + shared.separator + comclass + shared.separator + values[idx].index,
                                sensor: values[idx].read_only,
                                unit: values[idx].units,
                                min: values[idx].min,
                                max: values[idx].max,
                                value: values[idx].value,
                                help: values[idx].help,
                                item: values[idx].values
                            })
                        }
                    }
                }
                return gladys.socket.emit('zwave', node);
            });

        });

    /*if(!inclusionMode){
        inclusionMode = true;
        return addDevice();
    } else {
        inclusionMode = false;
        shared.zwave.cancelControllerCommand();
    }*/

}