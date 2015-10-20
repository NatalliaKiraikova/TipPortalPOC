angular.module('tip.navigation').directive('navigationItem', NavigationItem);

/** @ngInject */
function NavigationItem($state, $compile, tipRouter) {
  return {
    restrict: 'E',
    templateUrl: "tip.navigation/tmpl/iconwithlabel.html",
    scope: {
      data: '=data'
    },
    controller: function ($scope, tipRouter) {
      $scope.extendSref = function(sref) {
        return tipRouter.getRootState().name + "." + sref;
      }
  }
  }
}
