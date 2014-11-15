NGMOD.ExampleCtrl = NGMOD.controller('exampleCtrl', ['$scope', 'exampleService', function ($scope, exampleService) {
    
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
    }
}]);