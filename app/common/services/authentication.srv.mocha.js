define(['angular-mocks', 'chai', 'authenticationService'], function(mocks, chai) {

  describe('users service test', function() {

    var stubSessionsService = {
      ok: true,
      create: sinon.spy(function(login, pass) {
        var deferred = q.defer();
        if (this.ok) {
          deferred.resolve({
            email: "foo@bar.com",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZm9vIiwiaWF0IjoxMzE3Mzc0ODE4LCJleHAiOjIyMzM0NDAwMDB9.BSG_ABlS0fLIfCHXg13tta_vLWg1R1xxvau8G9yMK8o"
          });
        }
        else {
          deferred.reject({code: 400});
        }
        return deferred.promise;
      })
    };

    var authenticationSrv, $httpBackend, q, rootScope;

    beforeEach(mocks.module('myApp'));

    beforeEach(mocks.module(function($provide) {
        stubSessionsService.ok = true;
        $provide.service('sessionsService', function() {
          return stubSessionsService;
        });
    }));

    beforeEach(inject(function($injector, $rootScope, $q, localStorageService) {
      q = $q;
      $httpBackend = $injector.get('$httpBackend');
      rootScope = $rootScope;
      localStorageService.clearAll();

      sinon.spy(stubSessionsService.create);
      authenticationSrv = $injector.get('authenticationService');
    }));

    it('should have initial state', function() {
      expect(authenticationSrv.getUser()).to.be.null;
      expect(authenticationSrv.isAuthenticated()).to.not.be.ok;
    });

    it('should have set user and token correctly', function() {
      authenticationSrv.putLoginInfo({
        email: "foo@bar.com",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZm9vIiwiaWF0IjoxMzE3Mzc0ODE4LCJleHAiOjIyMzM0NDAwMDB9.BSG_ABlS0fLIfCHXg13tta_vLWg1R1xxvau8G9yMK8o"
      });

      expect(authenticationSrv.getUser()).to.have.property("email", "foo@bar.com");
      expect(authenticationSrv.getUser()).to.have.property("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZm9vIiwiaWF0IjoxMzE3Mzc0ODE4LCJleHAiOjIyMzM0NDAwMDB9.BSG_ABlS0fLIfCHXg13tta_vLWg1R1xxvau8G9yMK8o");
      expect(authenticationSrv.getUser()).to.have.property("id", "foo");
      expect(authenticationSrv.isAuthenticated()).to.be.ok;
    });



    it('should not authenicate when token is expired', function() {
      var res = authenticationSrv.putLoginInfo({
        email: "foo@bar.com",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZm9vIiwiaWF0IjoxMzE3Mzc0ODE4LCJleHAiOjEzMTc0NjEyMTh9._199jDkkc7pUhPQYNESI3ayBcW-J4OdbZdUbXd_G5ZQ"
      });
      expect(res).to.not.be.ok;
      expect(authenticationSrv.getUser()).to.be.null;
      expect(authenticationSrv.isAuthenticated()).to.not.be.ok;
    });

    it('should login user correctly', function() {
      authenticationSrv.login("foo", "bar");
      rootScope.$apply();
      expect(stubSessionsService.create).to.have.been.calledWith("foo", "bar"); 
      expect(authenticationSrv.isAuthenticated()).to.be.ok;
    });

    it('should not login user if sessionsService returned failure', function() {
      stubSessionsService.ok = false;
      authenticationSrv.login("foo", "bar");
      rootScope.$apply();
      expect(stubSessionsService.create).to.have.been.calledWith("foo", "bar"); 
      expect(authenticationSrv.isAuthenticated()).to.not.be.ok;
    });

    it('should logout correctly', function() {
      authenticationSrv.putLoginInfo({
        email: "foo@bar.com",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZm9vIiwiaWF0IjoxMzE3Mzc0ODE4LCJleHAiOjIyMzM0NDAwMDB9.BSG_ABlS0fLIfCHXg13tta_vLWg1R1xxvau8G9yMK8o"
      });

      expect(authenticationSrv.isAuthenticated()).to.be.ok;
      expect(authenticationSrv.getUser()).to.be.ok;
      authenticationSrv.logout();
      expect(authenticationSrv.isAuthenticated()).to.not.be.ok;
      expect(authenticationSrv.getUser()).to.be.null;
    });

  });
});