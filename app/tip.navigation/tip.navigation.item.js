angular.module('tip.navigation').directive('navigationItem', NavigationItem);

/** @ngInject */
function NavigationItem($state, $compile, tipRouter) {
  return {
    restrict: 'E',
    templateUrl: "tip.navigation/tmpl/iconwithlabel.html",
    scope: {
      data: '=data'
    },
    controller: function ($scope, $element, tipRouter) {
      var fullsref;
      $element.on("click", function () {
        if (fullsref) {
          $state.go(fullsref);
        }
      });

      $scope.extendSref = function (sref) {
        fullsref = tipRouter.getExtendedWithRootState(sref);
        return fullsref;
      }
    }
  }
}
