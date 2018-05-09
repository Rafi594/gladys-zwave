var translationsEN = {
    APPLY_CONFIGURATION:'Apply configuration',
    CANCEL: 'Cancel',
    CONFIGURATION: 'Configuration',
    EMPTY_NODE_TABLE: 'There is no node. To add, click network management and then include a node.',
    ERROR: 'Something bad happened :/ Check Gladys logs for more informations.',
    EXCLUDE_NODE: 'Exclude a node',
    EXCLUDED_NODE:'The node has been excluded from the network !',
    EXCLUDING_NODE: 'Excluding a node',
    EXCLUSION_PROCEDURE: 'You must press the device button to start the exclusion procedure.',
    HEAL_NETWORK: 'Heal network',
    HEALING_NETWORK: 'Network healing!',
    INCLUDE_NODE: 'Include a node',
    INCLUDING_NODE: 'Including a node',
    INCLUSION_PROCEDURE: 'You must press the device button to start the inclusion procedure.',
    MANUFACTURER: 'Manufacturer',
    NAME: 'Name',
    NETWORK_MANAGEMENT: 'Network management',
    NODE_CONFIGURATION:'Node configuration',
    NODE_ID: 'Node id',
    NODE_NAME_UPDATED: 'Node name updated !',
    PRODUCT: 'Product',
    RESTART_CONTROLLER: 'Restart controller',
    RESTARTING:'Restarting..',
    SETTINGS_APPLIED:'Settings applied !',
    TYPE: 'Type',
}

var translationsFR = {
    APPLY_CONFIGURATION:'Appliquer la configuration',
    CONFIGURATION: 'Configuration',
    CANCEL: 'Annuler',
    EMPTY_NODE_TABLE: 'Il n\'y a aucun noeud. Pour en ajouter cliquez sur gestion du réseau puis sur inclure un noeud.',
    ERROR: 'Une erreur inconnue est arrivée :/ Regardez les logs Gladys pour plus d\'informations.',
    EXCLUDE_NODE: 'Exclure un noeud',
    EXCLUDED_NODE:'Le noeud a été exclu du réseau !',
    EXCLUDING_NODE: 'Exclusion d\'un noeud',
    EXCLUSION_PROCEDURE: 'Veuillez appuyer sur le bouton du dispositif afin de lancer la procédure d\'exclusion.',
    HEAL_NETWORK: 'Guérir le réseau',
    HEALING_NETWORK: 'Lancement de la guérison du réseau !',
    INCLUDE_NODE: 'Inclure un noeud',
    INCLUDING_NODE: 'Inclusion d\'un noeud',
    INCLUSION_PROCEDURE: 'Veuillez appuyer sur le bouton du dispositif afin de lancer la procédure d\'inclusion.',
    MANUFACTURER: 'Fabricant',
    NAME: 'Nom',
    NETWORK_MANAGEMENT: 'Gestion du réseau',
    NODE_CONFIGURATION:'Configuration du noeud',
    NODE_ID: 'Id du noeud',
    NODE_NAME_UPDATED:'Nom du noeud mis à jour !',
    PRODUCT: 'Produit',
    RESTART_CONTROLLER: 'Redémarrer le controller',
    RESTARTING:'Redémarrage en cours..',
    SETTINGS_APPLIED:'Paramètres appliqués !',
    TYPE: 'Type',
}

angular
    .module('gladys')
    .config(['$translateProvider', function($translateProvider) {
        // add translation table
        $translateProvider
            .translations('en', translationsEN)
            .translations('fr', translationsFR);
    }]);