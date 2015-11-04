(function () {
  'use strict';

  angular
    .module('tip.portal.demo')
    .controller('tip.portal.demo.UserInfoController', UserInfoController);

  /** @ngInject */
  function UserInfoController($scope, UserProfileService) {

    UserProfileService.getUserProfile().then(
      function (resp) {
        $scope.userProfile = resp;
      }
    );
  }
})();
