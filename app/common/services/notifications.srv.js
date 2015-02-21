define(['app'], function(app) {
    return app.factory("notificationsService", function($timeout) {
       
        var notifications = [];
        var delay = 5000;

        this.add = function(notif, type) {
            
            notifications.push(notif);

            $timeout(function() {
                notifications.shift();
            }, delay);

        };

        this.get = function() {
            return notifications;
        };

        return this;
    });
});