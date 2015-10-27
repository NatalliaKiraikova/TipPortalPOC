(function () {
  'use strict';

  angular
    .module('tip.ipacs')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, tipRouterProvider) {
    tipRouterProvider.addNestedState({
      name: "ipacsroute1",
      url: "ipacsroute1",
      templateUrl: "/tip.ipacs/tmpl/tip.ipacs.tmpl.html"
    });
    tipRouterProvider.addNestedState({
      name: "ipacsroute2",
      url: "ipacsroute2",
      templateUrl: "/tip.ipacs/tmpl/tip.ipacs2.tmpl.html"
    });

    $urlRouterProvider.otherwise('/tip');
  }

})();
