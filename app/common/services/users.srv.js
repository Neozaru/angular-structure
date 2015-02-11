define(['app'], function(app) {
    return app.factory("usersService", function($resource, $q) {
        var User = $resource('/api/users/:id/:action', null, {
            'activate': {method: 'POST'}
        });

        this.create = function(email, password, username) {
            if (!email || !password) {
                var deferred = $q.defer();
                deferred.reject({code: 400});
                return deferred.promise;
            }
            var params = {email: email, password: password};
            if (username) {
                params.username = username;
            }
            var user = new User(params);
            return user.$save();
        };

        this.activate = function(userid, token) {
            if (!userid || !token) {
                var deferred = $q.defer();
                deferred.reject({code: 400});
                return deferred.promise;
            }
            return User.activate({action: 'activate'}, {'userid': userid, 'token': token}).$promise;
        }

        this.get = function(id) {
            return User.get({'id': id}).$promise;
        };

        return this;
    });
});