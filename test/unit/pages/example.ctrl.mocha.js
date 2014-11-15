describe('example controller test', function() {

  var scope;
  var ctrl;
  var mockExampleService;

  beforeEach(module('ngResource'));
  beforeEach(module('ui.router'));

  beforeEach(module('myApp'));

  beforeEach(inject(function($rootScope, $controller, $q) {
    scope = $rootScope.$new();
    var stubService = {
      retrieveMessage: function(name, from) {
        return $q(function(resolve, reject) {
          resolve({"message": "Hello to " + name + " from " + from});
        });
      }
    };
    mockExampleService = sinon.mock(stubService);
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

  });



});