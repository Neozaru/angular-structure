define(['app', 'exampleService', 'usersService', 'authenticationService', 'notificationsService', 'exampleComponent', 'notifBar'], function(app) {

    return app.controller('exampleCtrl', ['$scope', '$location', 'exampleService', 'usersService', 'authenticationService', 'notificationsService', function ($scope, $location, exampleService, usersService, authenticationService, notificationsService) {
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

        $scope.getUser = authenticationService.getUser;

        $scope.isLogged = function() { 
            return authenticationService.isAuthenticated(); 
        };

        $scope.logout = function() {
            return authenticationService.logout();
        };

        $scope.onAccountActivated = function(login_info) {
            authenticationService.putLoginInfo(login_info);
            notificationsService.add({text: "Your account has been successfully activated"});
        }

        $scope.doAction = function() {
            var params = $location.search();
            if (params.action) {
                if (params.action === "activate" && params.userid && params.token) {
                    usersService.activate(params.userid, params.token).then(
                        function(login_info) {
                            $scope.onAccountActivated(login_info);
                        },
                        function(error) {
                            console.warn(error);
                        }
                    );
                }
            }
        };

        $scope.notifGetter = notificationsService.get;

    }]);

});