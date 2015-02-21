define(['angular-mocks', 'formLogin'], function(mocks) {

  describe('form_login directive test', function() {

    var scope, element, compile;

    beforeEach(mocks.module('myApp'));

    beforeEach(mocks.inject(function($rootScope, $compile, $httpBackend) {
      $httpBackend.expectGET().respond("<span></span>");
      element = angular.element('<div data-form-login="" callback="stubcallback"></div>');
      scope = $rootScope.$new();
      compile = $compile;
      compile(element)(scope);
      scope.$digest();
    }));

    it('should initialize correctly', function() {
      expect(element.find("#email").text()).to.be.empty;
      expect(element.find("#password").text()).to.be.empty;
      expect(element.find("button").attr("disabled")).to.equal("disabled");
    });

    it('should lock submit button', function() {
      element.isolateScope().user = {email: "foo@bar.42", password: "1234567"}
      scope.$digest();
      expect(element.find("button").attr("disabled")).to.not.be.ok;

      element.isolateScope().user = {email: "foo", password: "1234567"}
      scope.$digest();
      expect(element.find("button").attr("disabled")).to.equal("disabled");

      element.isolateScope().user = {email: "foo@bar.42", password: "123456"}
      scope.$digest();
      expect(element.find("button").attr("disabled")).to.not.be.ok;

      element.isolateScope().user = {email: "foo", password: "123456"}
      scope.$digest();
      expect(element.find("button").attr("disabled")).to.equal("disabled");
    });


    it("should trigger callback correctly", function() {
      scope.stubcallback = sinon.spy();
      compile(element)(scope);
      element.isolateScope().submit("foo", "bar");
      sinon.assert.calledWith(scope.stubcallback, 'foo', 'bar');
    });

  });
});