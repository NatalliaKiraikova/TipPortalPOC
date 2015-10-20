angular.module('tip.navigation').directive('navigationTopPanel', NavigationTopPanel);

/** @ngInject */
function NavigationTopPanel($state, $compile, tipRouter) {
  return {
    restrict: 'E',
    templateUrl: "tip.navigation/tmpl/toppanel.html",
    scope: {},
    controller: function ($scope, contextModel) {
      $scope.navitems = [];

      $scope.$watch(function () {
          return contextModel.getCurrentConfig();
        }, function (newValue, oldValue) {
          $scope.navitems = newValue;
        }
      );
    }
  }
}
