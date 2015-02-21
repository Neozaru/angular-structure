define(['app'], function(app) {
    return app.factory("sessionsService", function($resource, $q) {
        var Session = $resource('/api/sessions/:token', null, {
            'refresh': {method: 'PUT'}
        });

        this.create = function(email, password) {
            if (!email || !password) {
                var deferred = $q.defer();
                deferred.reject({code: 400});
                return deferred.promise;
            }
            var session = new Session({email: email, password: password});
            return session.$save();
        };

        this.get = function(token) {
            return Session.get({'token': token}).$promise;
        };

        this.refresh = function(token) {
            return Session.refresh({'token': token}).$promise;
        }

        return this;
    });
});