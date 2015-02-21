define(['app', 'config', 'usersService', 'formRegister'], function(app, config) {

    return app.controller('registerCtrl', ['$scope', 'usersService', function ($scope, usersService) {
        $scope.errorsFile = config.errorsFile;
        
        $scope.register = function(email, password, username) {
            usersService.create(email, password, username).then(
                function(res) {
                    // NOPATM
                },
                function(err) {
                    $scope.lastError = err.status;
                }
            );
        };

    }]);

});