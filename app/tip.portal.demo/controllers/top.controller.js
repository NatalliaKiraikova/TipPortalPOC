(function() {
  'use strict';

  angular
    .module('tip.portal.demo')
    .controller('tip.portal.demo.TopController', TopController);

  /** @ngInject */
  function TopController(contextModel, DiscoveryService) {
    this.changeModule = function(name){
      //load navigation items here
      contextModel.setCurrentModuleName(name);
    };

    this.moduleList = DiscoveryService.getAvailableModules();
  }
})();
