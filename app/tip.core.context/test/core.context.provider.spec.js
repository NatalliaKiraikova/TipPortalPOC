(function () {
  'use strict';

  var _contextModel, scope, mockModel, catchedConfig;

  var MockModel = function () {
    this.mockConfig = [
      {
        iconprefix: 'trailer', label: 'ipacsroute1', state: 'ipacsroute1'
      }
    ]
    this.mockModuleName = 'mockModuleName';

    this.onConfigChange = function (newValue) {
      catchedConfig = newValue;
    }
  };

  describe("Unit: contextModel", function () {
    beforeEach(module('rt.eventemitter'));
    beforeEach(module('core.context'));
    mockModel = new MockModel();

    beforeEach(inject(function ($rootScope, contextModel) {
      // Create a new scope that's a child of the $rootScope
      scope = $rootScope.$new();
      _contextModel = contextModel;
    }));

    it('should dispatch event "ConfigChanged" and catch it', function () {
      expect(catchedConfig).toBeUndefined();
      spyOn(mockModel, "onConfigChange").and.callThrough();

      _contextModel.on(scope, 'ConfigChanged', mockModel.onConfigChange);
      _contextModel.setConfig(mockModel.mockModuleName, mockModel.mockConfig);
      _contextModel.setCurrentModuleName(mockModel.mockModuleName);

      expect(mockModel.onConfigChange).toHaveBeenCalledWith(mockModel.mockConfig);
      expect(catchedConfig).toEqual(mockModel.mockConfig);

    });
  });
})();
