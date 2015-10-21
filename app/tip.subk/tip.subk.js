(function () {
  'use strict';
  angular
    .module('tip.subk', [])
    .constant('SUBK_NAME', 'tip.subk')
    .config(function (contextModelProvider, SUBK_NAME) {
      var conf = {
        topPanelConfig: [
          {iconprefix: 'trailer', label: 'subkroute1', state: 'subkroute1'},
          {iconprefix: 'diamond', label: 'subkroute2', state: 'subkroute2'},
          {iconprefix: 'bank', label: 'subkroute3', state: 'subkroute3'}],
        leftPanelConfig: [
          {label: 'Demo Item 1 SUBK', state: 'subkroute1'},
          {label: 'Demo Item 2 SUBK', state: 'subkroute2'}
        ]
      };
      contextModelProvider.setConfig(SUBK_NAME, conf);
    })
})();
