angular
  .module('tip.core.router')
  .directive('shortUiSref', ExtendedUiSrefDirective);

/* @ngInject */
function ExtendedUiSrefDirective($state, $compile, tipRouter, $timeout) {
  return {
    restrict: 'A',
    priority: 1004,
    terminal: true,
    controller: function ($scope, $element, $attrs) {
      $scope.extendedSref = function (shortSref) {
        //extend shortSref with rootState
        return tipRouter.getExtendedWithRootState(shortSref);
      };
      $element.attr('ui-sref', '{{extendedSref("' + $attrs.shortUiSref + '")}}');

      // must be removed to prevent compile loop
      $element.removeAttr('short-ui-sref');
      $timeout(function () {
        var fn = $compile($element);
        fn($scope);
      }, 0);
    }
  }
}
