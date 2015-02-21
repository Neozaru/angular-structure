define(['angular-mocks', 'chai', 'sessionsService'], function(mocks, chai) {

  describe('sessions service test', function() {

    var sessionsSrv, $httpBackend, rootScope;

    beforeEach(mocks.module('myApp'));

    beforeEach(inject(function($rootScope) {
      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        sessionsSrv = $injector.get('sessionsService');
        rootScope = $rootScope;
      });
    }));

    it('should get session and return promises', function(done) {
      $httpBackend.expectGET('/api/sessions/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2Vyb25pbW8iLCJpYXQiOjEzMTczNzQ4MTgsImV4cCI6MTMxNzQ2MTIxOH0.dVgIFsMx-oK9nizvCqgAc4BFDpmKWICKqQE5BLr6YUo')
        .respond({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2Vyb25pbW8iLCJpYXQiOjEzMTczNzQ4MTgsImV4cCI6MTMxNzQ2MTIxOH0.dVgIFsMx-oK9nizvCqgAc4BFDpmKWICKqQE5BLr6YUo", "user": {"email": "foo"}});
      
      var sessionPromise = sessionsSrv.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2Vyb25pbW8iLCJpYXQiOjEzMTczNzQ4MTgsImV4cCI6MTMxNzQ2MTIxOH0.dVgIFsMx-oK9nizvCqgAc4BFDpmKWICKqQE5BLr6YUo")
      chai.expect(sessionPromise).to.eventually.have.property("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2Vyb25pbW8iLCJpYXQiOjEzMTczNzQ4MTgsImV4cCI6MTMxNzQ2MTIxOH0.dVgIFsMx-oK9nizvCqgAc4BFDpmKWICKqQE5BLr6YUo");
      chai.expect(sessionPromise).to.eventually.have.property("user");
      chai.expect(sessionPromise).to.eventually.have.deep.property("user.email", "foo").notify(done);

      $httpBackend.flush();

    });

    it('should create session and return promises', function(done) {
      $httpBackend.expectPOST('/api/sessions', {email: "foo", password: "bar"})
        .respond({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2Vyb25pbW8iLCJpYXQiOjEzMTczNzQ4MTgsImV4cCI6MTMxNzQ2MTIxOH0.dVgIFsMx-oK9nizvCqgAc4BFDpmKWICKqQE5BLr6YUo", "user": {"email": "foo"}});
      
      var sessionPromise = sessionsSrv.create("foo", "bar")
      chai.expect(sessionPromise).to.eventually.have.property("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2Vyb25pbW8iLCJpYXQiOjEzMTczNzQ4MTgsImV4cCI6MTMxNzQ2MTIxOH0.dVgIFsMx-oK9nizvCqgAc4BFDpmKWICKqQE5BLr6YUo");
      chai.expect(sessionPromise).to.eventually.have.property("user");
      chai.expect(sessionPromise).to.eventually.have.deep.property("user.email", "foo").notify(done);

      $httpBackend.flush();
    });

    it('should not create session with bad arguments', function(done) {

      {
        var sessionPromise = sessionsSrv.create();
        chai.expect(sessionPromise).to.eventually.rejected.with.property("code", 400).notify(done);
        rootScope.$apply();
      }

      {
        var sessionPromise = sessionsSrv.create("foo");
        chai.expect(sessionPromise).to.eventually.rejected.with.property("code", 400).notify(done);
        rootScope.$apply();
      }

      {
        var sessionPromise = sessionsSrv.create("", "bar");
        chai.expect(sessionPromise).to.eventually.rejected.with.property("code", 400).notify(done);
        rootScope.$apply();
      }
    });

  });
});