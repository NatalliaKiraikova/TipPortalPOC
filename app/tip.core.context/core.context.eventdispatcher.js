'use strict';
angular.module('core.context').provider('eventDispatcher', function (eventEmitter) {
  eventEmitter.inject(this);

  this.$get = function () {
    return this;
  };

});
