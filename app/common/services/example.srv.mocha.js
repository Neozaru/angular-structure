define(['angular-mocks'], function(mocks) {

  describe('example service test', function() {

    var srv, $httpBackend;

    beforeEach(mocks.module('myApp'));

    beforeEach(inject(function($rootScope) {
      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        srv = $injector.get('exampleService');
      });
    }));

    it('should return message', function(){
      $httpBackend.expectGET('http://foaas.herokuapp.com/linus/foo/bar').respond();
      srv.retrieveMessage('foo', 'bar');
      $httpBackend.flush();
    });

  });
});