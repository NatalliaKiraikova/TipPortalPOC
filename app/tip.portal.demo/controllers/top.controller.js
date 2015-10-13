(function() {
  'use strict';

  angular
    .module('tip.portal.demo')
    .controller('tip.portal.demo.TopController', TopController);

  /** @ngInject */
  function TopController() {
    this.changeModule = function(name){
      //load navigation items here
    };
  }
})();
