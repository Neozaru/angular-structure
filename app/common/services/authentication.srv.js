define(['app', 'sessionsService'], function(app) {
    return app.factory("authenticationService", ['$q', 'sessionsService', 'localStorageService', 'jwtHelper', function($q, sessionsService, localStorageService, jwtHelper) {
        
        this.putLoginInfo = function(info) {
            if (!info.token || jwtHelper.isTokenExpired(info.token)) {
                return false;
            }
            var tokenPayload = jwtHelper.decodeToken(info.token);
            var user = {
                id: tokenPayload.user_id,
                email: info.email,
                token: info.token
            };
            localStorageService.set("user", user);
            return true;
        };

        this.login = function(email, password) {
            var deferred = $q.defer();
            var self = this;
            sessionsService.create(email, password).then(
                function(info) {
                    self.putLoginInfo(info);
                    deferred.resolve(self.getUser());
                },
                function(error) {
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        };

        this.getUser = function() {
            return localStorageService.get("user");
        };

        this.isAuthenticated = function() {
            return this.getUser() !== null;
        };

        this.logout = function() {
            localStorageService.remove("user");
        };

        return this;
    }]);
});