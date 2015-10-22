'use strict';
angular
  .module('tip.portal.demo')
  .service('DiscoveryService', DiscoveryService);

function DiscoveryService() {
  var mockModules = [
    {id: "tip.subk"},
    {id: "tip.ipacs"},
  ]

  this.getAvailableModules = function () {
    //todo load real data here
    return mockModules;
  }

}
