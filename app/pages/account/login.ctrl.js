define(['app', 'authenticationService', 'formLogin'], function(app) {

    return app.controller('loginCtrl', ['$scope', '$state', 'authenticationService', function ($scope, $state, authenticationService) {

        $scope.login = function(username, password) {
            authenticationService.login(username, password).then(
                function(res) {
                    $state.go('home');
                },
                function(error) {
                    console.log(error);
                }
            );
        }

    }]);

});