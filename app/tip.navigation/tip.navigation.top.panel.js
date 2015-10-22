angular.module('tip.navigation').directive('navigationTopPanel', NavigationTopPanel);

/** @ngInject */
function NavigationTopPanel() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "tip.navigation/tmpl/toppanel.html",
    scope: {},
    controller: function ($scope, contextModel, tipRouter) {
      $scope.navitems = [];

      $scope.$watch(function () {
          return contextModel.getCurrentConfig();
        }, function (newValue, oldValue) {
          $scope.navitems = newValue;
        }
      );

      $scope.rootSref = function () {
        return tipRouter.getRootState().name;
      }
    }
  }
}
