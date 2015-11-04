(function () {
  'use strict';

  angular
    .module('tip.portal.demo')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, tipRouterProvider) {
    tipRouterProvider.addNestedState({
      name: "userinfo",
      url: "userinfo",
      controller: 'tip.portal.demo.UserInfoController',
      templateUrl: "/tip.portal.demo/tmpl/userinfo.tmpl.html"
    });
    tipRouterProvider
      .setRootState({
        name: 'tip',
        url: '/tip',
        views: {
          '@': {
            templateUrl: '/tip.portal.demo/tmpl/layout.tmpl.html',
            controller: 'tip.portal.demo.Controller'
          },
          'top@tip': {
            templateUrl: '/tip.portal.demo/tmpl/header.tmpl.html',
            controller: 'tip.portal.demo.TopController',
            controllerAs: 'vm'
          },
          'left@tip': {templateUrl: '/tip.portal.demo/tmpl/leftpane.tmpl.html'}
        }
      });

    $urlRouterProvider.otherwise('/tip');
  }

})();
