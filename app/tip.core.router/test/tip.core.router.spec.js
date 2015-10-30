(function () {
  'use strict';

  describe("Unit: ExtendedUiSrefDirective", function () {
    beforeEach(module('ui.router'));
    beforeEach(module('tip.core.router'));
    var compile, scope, element;

    beforeEach(inject(function ($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();
      element = compile("<a short-ui-sref='subkroute1'></a>")(scope);
      scope.$digest();
    }));

    it('should replace attribute "ui-sref" with extended value and remove attribute "short-ui-sref"', function () {
      expect(element.attr('short-ui-sref')).toBeUndefined();
      expect(element.attr('ui-sref')).not.toBeUndefined();
    });
  });

})();
