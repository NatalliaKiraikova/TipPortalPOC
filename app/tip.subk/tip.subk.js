(function () {
  'use strict';
  angular
    .module('tip.subk', [])
    .constant('SUBK_NAME', 'tip.subk')
    .config(function (contextModelProvider, SUBK_NAME) {
      var conf = [{iconprefix: 'trailer', label: 'subkroute1', state: 'subkroute1'},
        {iconprefix: 'diamond', label: 'subkroute2', state: 'subkroute2'},
        {iconprefix: 'bank', label: 'subkroute3', state: 'subkroute3'}];

      contextModelProvider.setConfig(SUBK_NAME, conf);
    })
})();
