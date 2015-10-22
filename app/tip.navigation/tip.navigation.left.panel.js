angular.module('tip.navigation').directive('navigationLeftPanel', NavigationLeftPanel);

/** @ngInject */
function NavigationLeftPanel() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "tip.navigation/tmpl/leftpanel.html",
    scope: {},
    controller: function ($scope, contextModel, tipRouter) {
      $scope.navitems = [];

      $scope.$watch(function () {
          return contextModel.getLeftMenuConfig();
        }, function (newValue, oldValue) {
          $scope.navitems = newValue;
        }
      );

      $scope.extendSref = function (sref) {
        return tipRouter.getExtendedWithRootState(sref);
      }
    }
  }
}
