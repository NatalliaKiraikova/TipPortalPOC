angular.module('tip.navigation').directive('navigationLeftPanel', NavigationLeftPanel);

/** @ngInject */
function NavigationLeftPanel() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "tip.navigation/tmpl/leftpanel.html",
    scope: {},
    controller: function ($scope, contextModel, tipRouter) {
      var leftMenuConfigKey = 'children';
      var titleItemKey = 'label';
      $scope.navitems = [];
      $scope.titleItem = null;
      $scope.$watch(function () {
          return contextModel.getLeftMenuConfig();
        }, function (newValue, oldValue) {
          $scope.navitems = newValue && newValue.hasOwnProperty(leftMenuConfigKey) ? newValue[leftMenuConfigKey] : undefined;
          $scope.titleItem = newValue && newValue.hasOwnProperty(titleItemKey) ? newValue[titleItemKey] : undefined;
        }
      );

      $scope.extendSref = function (sref) {
        return tipRouter.getExtendedWithRootState(sref);
      }
    }
  }
}
