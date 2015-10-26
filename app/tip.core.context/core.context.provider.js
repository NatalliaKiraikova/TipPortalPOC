'use strict';
angular.module('core.context').provider('contextModel', function () {

  this.configMap = [];

  this.$get = function (eventEmitter) {
    //this.dispatcher = eventDispatcher;
    eventEmitter.inject(this);
    return this;
  }

  this.setCurrentModuleName = function (moduleName) {
    this.currentModuleName = moduleName;
    this.currentConfig = this.configMap ? this.configMap[this.currentModuleName] : undefined;
    this.emit('ConfigChanged', this.currentConfig);
  }

  this.setLeftMenuConfig = function (topPanelItem) {
    this.currentLeftMenuConfig = topPanelItem;
    this.emit('LeftMenuConfigChanged', this.currentLeftMenuConfig);
  }

  this.setConfig = function (moduleName, moduleConfig) {
    this.configMap[moduleName] = moduleConfig;
  };
});
