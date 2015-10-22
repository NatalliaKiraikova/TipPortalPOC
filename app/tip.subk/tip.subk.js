(function () {
  'use strict';
  angular
    .module('tip.subk', [])
    .constant('SUBK_NAME', 'tip.subk')
    .config(function (contextModelProvider, SUBK_NAME) {
      var conf = [
        {
          iconprefix: 'trailer', label: 'subkroute1', state: 'subkroute1',
          children: [
            {label: 'Demo Item 1 SUBK', state: 'subkroute1'},
            {label: 'Demo Item 2 SUBK', state: 'subkroute2'}
          ]
        },
        {
          iconprefix: 'diamond', label: 'subkroute2', state: 'subkroute2',
          children: [
            {label: 'Demo Item 2 SUBK NO state',
              children: [
                {label: 'Demo Item 3 SUBK', state: 'subkroute1'},
                {label: 'Demo Item 4 SUBK', state: 'subkroute2'}
              ]
            }
          ]
        },
        {
          iconprefix: 'bank', label: 'subkroute3', state: 'subkroute3',
          children: [
            {label: 'Demo Item 1 SUBK  SUBK NO state'}
          ]
        }];
      contextModelProvider.setConfig(SUBK_NAME, conf);
    })
})
();
