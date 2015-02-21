define(['angular-mocks', 'chai', 'usersService'], function(mocks, chai) {

  describe('users service test', function() {
    var usersSrv, $httpBackend, rootScope;

    beforeEach(mocks.module('myApp'));

    beforeEach(inject(function($rootScope) {
      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        usersSrv = $injector.get('usersService');
        rootScope = $rootScope
      });
    }));

    it('should get user and return promises', function(done) {
      $httpBackend.expectGET('/api/users/1')
        .respond({"email": "foo"});
      chai.expect(usersSrv.get(1)).to.eventually.have.property("email","foo").notify(done);

      $httpBackend.flush();
    });

    it('should create user and return promises', function(done) {
      $httpBackend.expectPOST('/api/users', {email: "foo", password: "bar"})
        .respond({"email": "foo"});
      chai.expect(usersSrv.create("foo", "bar")).to.eventually.have.property("email", "foo");
      $httpBackend.flush();

      $httpBackend.expectPOST('/api/users', {email: "foo", password: "bar", username: "neozaru"})
        .respond({"email": "foo"});
      chai.expect(usersSrv.create("foo", "bar", "neozaru")).to.eventually.have.property("email","foo").notify(done);
      $httpBackend.flush();
    });

    it('should fail if no argument', function(done) {

      {
        var userPromise = usersSrv.create();
        chai.expect(userPromise).to.eventually.rejected.with.property("code", 400);
        rootScope.$apply();
      }

      {
        var userPromise = usersSrv.create("foo");
        chai.expect(userPromise).to.eventually.rejected.with.property("code", 400);
        rootScope.$apply();
      }


      {
        var userPromise = usersSrv.create("", "bar");
        chai.expect(userPromise).to.eventually.rejected.with.property("code", 400).notify(done);
        rootScope.$apply();
      }

    });

  });
});