angular.module('tip.navigation').directive('navigationMenu', NavigationDropDownMenu);

/** @ngInject */
function NavigationDropDownMenu() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "tip.navigation/tmpl/dropdown.html",
    scope: {
      data: '=',
      onclickhandler: '&'
    }
  }
}
