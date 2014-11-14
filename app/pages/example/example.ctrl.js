NGMOD.ExampleCtrl = NGMOD.controller('ExampleCtrl', function ($scope, exampleService) {
    
    $scope.messages = [];

    $scope.name = "foo";
    $scope.value = "My button label";


    $scope.getMessage = function() {
        exampleService.retrieveMessage($scope.name, "Neozaru").then(
            function ok(response) {
                console.log("Got a response!!");
                console.log(response);
                $scope.messages.push(response.message);
            },
            function err(error) {
                console.err("Got an error :'(");
            }
        );
    }

});