define(['angular-mocks', 'exampleComponent'], function(mocks) {

  describe('example_input directive test', function() {

    var element;

    beforeEach(mocks.module('myApp'));

    beforeEach(inject(function($rootScope, $compile, $httpBackend) {
      $httpBackend.expectGET().respond("<span></span>");
      element = angular.element('<div data-example-input="" data-value="value"></div>');
      $compile(element)($rootScope);
      $httpBackend.flush();
    }));

    it('should initialize correctly', function(){
      expect(element.isolateScope().count).to.equal(0);
    });

    it('should increment correctly', function(){
      element.isolateScope().increment();
      expect(element.isolateScope().count).to.equal(1);
      element.isolateScope().increment();
      expect(element.isolateScope().count).to.equal(2);
    });

  });
});