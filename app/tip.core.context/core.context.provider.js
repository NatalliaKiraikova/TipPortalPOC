angular.module('core.context').provider('contextModel', function () {

  this.configMap = [];

  this.$get = function () {
    return this;
  };

  this.setCurrentModuleName = function (moduleName) {
    this.currentModuleName = moduleName;
  };

  this.getCurrentConfig = function () {
    if (!this.currentModuleName) {
      // throw new Error("Current module name wasn't set");
      return undefined;
    }

    //if (this.currentModuleName in this.configMap) {
      return this.configMap ? this.configMap[this.currentModuleName] : undefined;
      /*} else {
      throw new Error("There is no Config for current module name " + this.currentModuleName);
    }*/
  };

  this.setConfig = function (moduleName, moduleConfig) {
    this.configMap[moduleName] = moduleConfig;
  };
});
