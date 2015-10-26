'use strict';
angular.module('tip.navigation').directive('navigationItem', NavigationItem);

/** @ngInject */
function NavigationItem($state) {
  return {
    restrict: 'E',
    templateUrl: "tip.navigation/tmpl/iconwithlabel.html",
    scope: {
      data: '=data'
    },
    controller: function ($scope, $element, tipRouter, contextModel) {
      var fullsref;
      $element.on("click", function () {
        contextModel.setLeftMenuConfig($scope.data);
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
