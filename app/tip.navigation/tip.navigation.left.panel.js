angular.module('tip.navigation').directive('navigationLeftPanel', NavigationLeftPanel);

/** @ngInject */
function NavigationLeftPanel() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "tip.navigation/tmpl/leftpanel.html",
    scope: {},
    controller: function ($scope, contextModel, tipRouter) {
      var leftPanelConfig = "leftPanelConfig";
      $scope.navitems = [];

      $scope.$watch(function () {
          return contextModel.getCurrentConfig();
        }, function (newValue, oldValue) {
          if (newValue && leftPanelConfig in newValue) {
            $scope.navitems = newValue[leftPanelConfig];
          }
        }
      );

      $scope.extendSref = function (sref) {
        return tipRouter.getExtendedWithRootState(sref);
      }
    }
  }
}
