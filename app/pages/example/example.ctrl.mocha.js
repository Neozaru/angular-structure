define(['angular-mocks', 'exampleCtrl'], function(mocks) {

  describe('example controller test', function() {

    var scope;
    var ctrl;
    var stubService;

    beforeEach(mocks.module('myApp'));

    beforeEach(inject(function($rootScope, $controller, $q) {
      scope = $rootScope.$new();
      stubService = {
        ok: true
      };
      stubService.retrieveMessage = function(name, from) {
        var _this = this;
        return $q(function(resolve, reject) {
          if (_this.ok) {
            resolve({"message": "Hello to " + name + " from " + from});
          }
          else {
            reject("Batman error");
          }
        });
      };
      
      ctrl = $controller('exampleCtrl', {$scope: scope, 'exampleService': stubService});
    }));

    it('should have initial values', function(){
      expect(scope.name).to.equal("foo");
      expect(scope.value).to.equal("My button label");
      expect(scope.messages).to.have.length(0);
    });

    describe('getMessage', function() {
      it('should add received messages', function() {
        scope.getMessage();
        scope.$digest();

        expect(scope.messages).to.have.length(1);
        expect(scope.messages[0]).to.equal("Hello to foo from Neozaru");
      });

      it('should change content depending on the name', function() {
        scope.name = "New name";
        scope.getMessage();
        scope.$digest();

        expect(scope.messages).to.have.length(1);
        expect(scope.messages[0]).to.equal("Hello to New name from Neozaru");
      });

      it('should register errors', function() {
        stubService.ok = false;
        scope.getMessage();
        scope.$digest();

        expect(scope.messages).to.have.length(0);
        expect(scope.lastError).to.equal("HTTP error : Batman error");
      });

      it('should perform action', function() {
        scope.doAction();
      });

    });

  });

});