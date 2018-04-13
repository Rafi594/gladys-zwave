var shared = require('./zwave.shared.js');
var zwave = shared.zwave;
var setupMode = shared.setupMode;

module.exports = function setup(){

    return gladys.param.getValue(shared.gladysUsbPortParam)
        .then((usbPort) => {
            zwave.disconnect(usbPort);
            zwave.connect(usbPort);
            var nodes = [];
            var allNodeInfo = [];
 
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

            zwave.on('value added', function(nodeid, comclass, valueId) {
                if (!nodes[nodeid]['classes'][comclass])
                    nodes[nodeid]['classes'][comclass] = {};
                nodes[nodeid]['classes'][comclass][valueId.index] = valueId;
            });

            zwave.on('node ready', function(nodeid, nodeinfo) {

                var newNode = {
                    info_node: {
                        node_id: `${nodeid}`,
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
                        
                        if(values[idx].genre != "user" && values[idx].genre != "system"){
                            
                            newNode.params.push({
                                index: values[idx].index,
                                name: values[idx].label,
                                type: values[idx].type,
                                identifier: nodeid + shared.separator + comclass + shared.separator + values[idx].index,
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
                allNodeInfo.push(newNode)                
            });

            //if setup mode was activated, don't create new event
            if(!setupMode){
                zwave.on('scan complete', function(){
                    gladys.socket.emit('zwave', allNodeInfo);
                    // reset table for next scan
                    allNodeInfo = []
                    // set setup mode in activated
                    shared.setupMode = true
                    setupMode = true
                })
            }

        })
}