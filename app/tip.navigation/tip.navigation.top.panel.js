angular.module('tip.navigation').directive('navigationTopPanel', NavigationTopPanel);

/** @ngInject */
function NavigationTopPanel() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "tip.navigation/tmpl/toppanel.html",
    scope: {},
    controller: function ($scope, contextModel, tipRouter) {
      var topPanelConfig = "topPanelConfig";
      $scope.navitems = [];

      $scope.$watch(function () {
          return contextModel.getCurrentConfig();
        }, function (newValue, oldValue) {

          if (newValue && topPanelConfig in newValue) {
            $scope.navitems = newValue[topPanelConfig];
          }
        }
      );

      $scope.rootSref = function () {
        return tipRouter.getRootState().name;
      }
    }
  }
}
