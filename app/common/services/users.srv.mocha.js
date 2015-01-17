define(['angular-mocks', 'chai', 'usersService'], function(mocks, chai) {

  describe('users service test', function() {
    var usersSrv, $httpBackend;

    beforeEach(mocks.module('myApp'));

    beforeEach(inject(function($rootScope) {
      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        usersSrv = $injector.get('usersService');
      });
    }));

    it('should get user and return promises', function(done) {
      $httpBackend.expectGET('/api/users/1')
        .respond({"email": "foo"});
      usersSrv.get(1)
        .then(function(res) { 
          expect(res).to.have.property("email", "foo");
        })
        .catch(function(err) {
          done(err);
        })
        .finally(function() {
          done();
        });
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

    it('should fail if no argument', function() {

      usersSrv.create()
        .then(function(res) { 
          done(res);
        })
        .catch(function(err) {
          expect(err).to.have.property("code", 400);
          done();
        })
        .finally(function() {
          done();
        });


    });

  });
});