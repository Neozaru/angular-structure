define(['angular-mocks', 'notifBar'], function(mocks) {

  describe('form_register directive test', function() {

    var getDomNotifications = function(element) {
      return element[0].querySelectorAll(".notification");
    };

    var scope, element, compile, timeout;

    beforeEach(mocks.module('myApp'));

    beforeEach(mocks.inject(function($rootScope, $compile, $httpBackend, $timeout) {
      $httpBackend.expectGET().respond("<span></span>");
      element = angular.element('<div data-notif-bar="" getter="getter"></div>');
      scope = $rootScope.$new();
      compile = $compile;
      timeout = $timeout;
      compile(element)(scope);
      scope.$digest();
    }));

    it('should initialize correctly', function() {
      expect(getDomNotifications(element)).to.have.length(0);
    });


    it('should display notifications', function() {
      var notifs = [
        {text: "foo"}, 
        {text: "bar"}
      ];
      scope.getter = function() { return notifs; }
      scope.$digest();

      {
        var domNotifs = getDomNotifications(element);
        expect(domNotifs).to.have.length(2);
        expect(angular.element(domNotifs[0]).text()).to.contain("foo");
        expect(angular.element(domNotifs[1]).text()).to.contain("bar");
      }

      scope.getter = function() { return []; }
      scope.$digest();
      {
        var domNotifs = getDomNotifications(element);
        expect(domNotifs).to.have.length(0);
      }

    });

  });
});