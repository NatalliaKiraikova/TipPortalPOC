//DRAFT VERSION JUST FOR POC
angular.module('tip.core.router')
  .directive('tipState', TipStateDirective);
/** @ngInject */
function TipStateDirective($state, $compile,tipRouter) {
  return {
    restrict: 'A',
    scope: {
      tipState: '='
    },
    replace:true,
    link: function(scope, element) {
      scope.srefState = tipRouter.getRootState().name+"."+scope.tipState.state;
      //create an angular element. (this is still our "view")
      var el = angular.element('<a ui-sref="{{srefState}}">{{tipState.label}}</a>'),

      //compile the view into a function.
       compiled = $compile(el);

      //append our view to the element of the directive.
      element.append(el);

      //bind our view to the scope!
      //(try commenting out this line to see what happens!)
      compiled(scope);
    }
  }
}
