(function () {
  'use strict';
  angular
    .module('tip.ipacs', [])
    .constant('IPACS_NAME', 'tip.ipacs')
    .config(function (contextModelProvider, IPACS_NAME) {
      var conf = {
        topPanelConfig:[
        {iconprefix: 'trailer', label: 'ipacsroute1', state: 'ipacsroute1'},
        {iconprefix: 'bank', label: 'ipacsroute2', state: 'ipacsroute2'}
      ],
      leftPanelConfig:[
        { label: 'Demo Item 1 IPACS', state: 'ipacsroute1'},
        { label: 'Demo Item 2 IPACS', state: 'ipacsroute2'}
      ]};
      contextModelProvider.setConfig(IPACS_NAME, conf);
    })
})();
