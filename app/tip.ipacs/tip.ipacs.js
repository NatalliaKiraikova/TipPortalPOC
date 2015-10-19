(function () {
  'use strict';
  angular
    .module('tip.ipacs', [])
    .constant('IPACS_NAME', 'tip.ipacs')
    .config(function (contextModelProvider, IPACS_NAME) {
      var conf = [{iconprefix: 'trailer', label: 'ipacsroute1', state: 'ipacsroute1'},
        {iconprefix: 'bank', label: 'ipacsroute2', state: 'ipacsroute2'}];
      contextModelProvider.setConfig(IPACS_NAME, conf);
    })
})();
