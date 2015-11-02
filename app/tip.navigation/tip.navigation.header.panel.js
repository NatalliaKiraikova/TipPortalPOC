'use strict';
angular.module('tip.navigation').directive('navigationHeaderPanel', NavigationHeaderPanel);

/** @ngInject */
function NavigationHeaderPanel() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "tip.navigation/tmpl/headerpanel.html",
    scope: {},
    controller: function ($scope, UserProfileService, tipRouter) {

      UserProfileService.getUserProfile().then(
        function (resp) {
          $scope.userProfile = resp;
        }
      );
    }
  }
}
