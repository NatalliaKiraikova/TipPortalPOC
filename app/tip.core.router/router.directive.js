angular
  .module('tip.core.router')
  .directive('shortUiSref', ExtendedUiSrefDirective);

/** @ngInject */
function ExtendedUiSrefDirective($state, $compile, tipRouter) {
  return {
    restrict: 'A',
    priority: 1004,
    terminal: true,

    controller: function ($scope) {
      $scope.extendedSref = function (shortSref) {
        //extend shortSref with rootState
        return tipRouter.getRootState().name + "." + $scope.$eval(shortSref);
      }
    },

    compile: function ($element, $attrs) {
      //create ui-sref attribute
      $element.attr('ui-sref', '{{extendedSref("' + $attrs.shortUiSref + '")}}');

      // must be removed to prevent compile loop
      $element.removeAttr('short-ui-sref');

      // compiling again
      var fn = $compile($element);
      return function ($scope) {
        fn($scope);
      }
    }
  }
}
