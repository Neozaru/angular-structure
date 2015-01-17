define(['app', 'exampleService', 'usersService', 'formRegister', 'exampleComponent'], function(app) {

    return app.controller('exampleCtrl', ['$scope', 'exampleService', 'usersService', function ($scope, exampleService, usersService) {
        $scope.messages = [];
        $scope.lastError = "";

        $scope.name = "foo";
        $scope.value = "My button label";

        $scope.getMessage = function() {
            exampleService.retrieveMessage($scope.name, "Neozaru").then(
                function ok(response) {
                    $scope.lastError = "";
                    $scope.messages.push(response.message);
                },
                function err(error) {
                    $scope.lastError = "HTTP error : " + error;
                }
            );
        };

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