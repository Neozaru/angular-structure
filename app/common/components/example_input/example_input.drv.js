NGMOD.directive('exampleInput', [ function () {
return {
    restrict: 'A',
    scope: { value: '=value'},
    templateUrl: 'app/common/components/example_input/example_input.html',
    link: function (scope, element, attr) {

        scope.count = 0;
        scope.increment = function() {
            scope.count++;
        }

    }
}
}]);