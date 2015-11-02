'use strict';
angular
  .module('tip.portal.demo')
  .service('UserProfileService', UserProfileService);

function UserProfileService($q, $timeout) {

  var userProfile =
  {
    name: "Peter",
    surname: "Pan",
    address1: "Neverland",
    address2: " Kensington Gardens",
    numberOfMessages: 15
  }

  this.getUserProfile = function () {
    var deferred = $q.defer();
    $timeout(function () {
      deferred.resolve(userProfile);
    }, 500);
    return deferred.promise;
  }
}
