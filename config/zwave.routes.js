/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Mathieu Andrade
  */

module.exports.routes = {
    
    // Zwave
    'post /zwave/addnode': 'ZwaveController.add',
    'delete /zwave/removenode/:id': 'ZwaveController.remove',
    'patch /zwave/setnodename': 'ZwaveController.setName',
    'post /zwave/healnetwork': 'ZwaveController.heal',
  
  };
  