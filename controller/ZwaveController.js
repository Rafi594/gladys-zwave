/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Mathieu Andrade
*/

addNode = require('../lib/addNode.js');
removeNode = require('../lib/removeNode.js');
setNodeName = require('../lib/setNodeName.js');
healNetwork = require('../lib/healNetwork.js');

module.exports = {

  add: function(req, res, next){
    addnode()
      .then((result) => res.json(result))
  },

  remove: function(req, res, next){
    removeNode({id: req.params.id})
      .then((result) => res.json(result))
  },

  setName: function(req, res, next){
    sails.log.debug("setName")
    setNodeName(req.body)
      .then((result) => res.json(result))
  },

  heal: function(req, res, next){
    sails.log.debug("heal")
    healNetwork()
      .then((result) => res.json(result))
  },

}
