define(['angular-mocks', 'exampleCtrl'], function(mocks) {

  describe('example controller test', function() {

    var scope;
    var ctrl;
    var q;
    var location;

    var stubService = {
      ok: true,
      retrieveMessage = function(name, from) {
        var _this = this;
        return $q(function(resolve, reject) {
          if (_this.ok) {
            resolve({"message": "Hello to " + name + " from " + from});
          }
          else {
            reject("Batman error");
          }
        });
      }
    };

    var mockUsersService = {
      ok: true,
      activate: sinon.spy(function() {
        _this = this;
        return q(function(resolve, reject) {
          if (_this.ok) {
            resolve({userid: 1, token: "foo"});
          }
          else {
            reject("Batman error");
          }
        });
      })
    };

    var mockAuthenticationService = {
      ok: true,
      putLoginInfo: sinon.spy()
    };

    beforeEach(mocks.module('myApp'));

    beforeEach(inject(function($rootScope, $controller, $q, $location) {
      q = $q;
      location = $location;
      location.search({});
      scope = $rootScope.$new();


      mockAuthenticationService.putLoginInfo.reset();
      mockUsersService.activate.reset();

      ctrl = $controller('exampleCtrl', {
        $scope: scope, 'exampleService': stubService, 
        'usersService': mockUsersService, 
        'authenticationService': mockAuthenticationService}
      );

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

      it('should not perform action if bad parameters', function() {
        scope.doAction();
        expect(mockUsersService.activate).to.have.not.been.called;
        location.search({action: "activate"});
        scope.doAction();
        expect(mockUsersService.activate).to.have.not.been.called;
        location.search({userid: 1});
        scope.doAction();
        expect(mockUsersService.activate).to.have.not.been.called;
        location.search({token: "foo"});
        scope.doAction();
        expect(mockUsersService.activate).to.have.not.been.called;
        location.search({action: "activate", userid: 1});
        scope.doAction();
        expect(mockUsersService.activate).to.have.not.been.called;
        location.search({action: "activate", token: "foo"});
        scope.doAction();
        expect(mockUsersService.activate).to.have.not.been.called;
        location.search({userid: 1, token: "foo"});
        scope.doAction();
        expect(mockUsersService.activate).to.have.not.been.called;
      });

      it('should perform "activate" action if proper parameters', function() {
        scope.onAccountActivated = sinon.spy(scope.onAccountActivated)
        location.search({action: "activate", token: "foo", userid: 1});

        {
          scope.doAction();
          expect(mockUsersService.activate).to.have.been.calledWith(1, "foo");
          scope.$digest();
          expect(scope.onAccountActivated).to.have.been.calledWith({userid: 1, token: "foo"});
          scope.onAccountActivated.reset();
        }

        {
          mockUsersService.ok = false;
          scope.doAction();
          scope.$digest();
          expect(scope.onAccountActivated).to.have.not.been.called;
          scope.onAccountActivated.reset();
        }
      });

    });

  });

});