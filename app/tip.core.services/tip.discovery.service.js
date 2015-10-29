'use strict';
angular
  .module('tip.portal.demo')
  .service('DiscoveryService', DiscoveryService);

function DiscoveryService($q, $timeout) {
  var mockModules = [
    {id: "tip.subk"},
    {id: "tip.ipacs"},
  ]

  this.getAvailableModules = function () {
    var deferred = $q.defer();
    $timeout(function () {
      deferred.resolve(mockModules);
    }, 500);
    return deferred.promise;
  }
}
