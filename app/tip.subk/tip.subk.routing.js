(function () {
  'use strict';

  angular
    .module('tip.subk')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, tipRouterProvider) {
    tipRouterProvider.addNestedState({
      name: "subkroute1",
      url: "subkroute1",
      templateUrl: "/tip.subk/tmpl/tip.subk.tmpl.html"
    });
    tipRouterProvider.addNestedState({
      name: "subkroute2",
      url: "subkroute2",
      templateUrl: "/tip.subk/tmpl/tip.subk2.tmpl.html"
    });
    tipRouterProvider.addNestedState({
      name: "subkroute3",
      url: "subkroute3",
      templateUrl: "/tip.subk/tmpl/tip.subk3.tmpl.html"
    });

    $urlRouterProvider.otherwise('/tip');
  }

})();
