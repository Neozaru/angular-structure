define(['angular-mocks', 'chai', 'notificationsService'], function(mocks, chai) {

  describe('notificationsService test', function() {

    var notificationsSrv, rootScope, timeout;

    beforeEach(mocks.module('myApp'));

    beforeEach(inject(function($rootScope, $timeout) {
      inject(function($injector) {
        timeout = $timeout;
        notificationsSrv = $injector.get('notificationsService');
        rootScope = $rootScope;
      });
    }));

    it('should store notifications for some time', function() {

      this.timeout(10000);
      expect(notificationsSrv.get()).to.be.empty;
      notificationsSrv.add("foo", "bar");
      expect(notificationsSrv.get()).to.have.length(1);
      timeout.flush();
      expect(notificationsSrv.get()).to.be.empty;

    });


  });
});