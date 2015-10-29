(function () {
  'use strict';

  angular
    .module('tip.portal.demo')
    .controller('tip.portal.demo.TopController', TopController);

  /** @ngInject */
  function TopController(contextModel, DiscoveryService) {
    var self = this;

    this.changeModule = function (name) {
      //load navigation items here
      contextModel.setCurrentModuleName(name);
    };

    DiscoveryService.getAvailableModules().then(
      function (resp) {
        self.moduleList = resp;
      }
    );
  }
})();
