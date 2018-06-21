/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Mathieu Andrade
*/

addNode = require('../lib/zwave.addNode.js');
removeNode = require('../lib/zwave.removeNode.js');
getNodeParams = require('../lib/zwave.getNodeParams.js');
setNodeName = require('../lib/zwave.setNodeName.js');
healNetwork = require('../lib/zwave.healNetwork.js');
setNodeParam = require('../lib/zwave.setNodeParam.js');
softReset = require('../lib/zwave.softReset.js');
setupNodes = require('../lib/zwave.setup.js');
getPorts = require('../lib/zwave.getPorts.js');
setPort = require('../lib/zwave.setPort.js');

module.exports = {

  add: function(req, res, next){
    addNode()
      .then((result) => res.json(result))
  },

  remove: function(req, res, next){
    removeNode()
      .then((result) => res.json(result))
  },

  getParams: function(req, res, next){
    getNodeParams({id: req.params.id})
      .then((result) => res.json(result))
  },

  setName: function(req, res, next){
    setNodeName(req.body)
      .then((result) => res.json(result))
  },

  heal: function(req, res, next){
    healNetwork()
      .then((result) => res.json(result))
  },

  setParam: function(req, res, next){
    setNodeParam(req.body)
      .then((result) => res.json(result))
  },

  reset: function(req, res, next){
    softReset()
      .then((result) => res.json(result))
  },

  setup: function(req, res, next){
    setupNodes()
      .then((result) => res.json(result))
  },

  getPorts: function(req, res, next){
    getPorts()
      .then((result) => res.json(result))
  },

  setPort: function(req, res, next){
    setPort(req.body)
      .then((result) => res.json(result))
  },

}