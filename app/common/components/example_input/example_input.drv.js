define(['app', 'require-text!exampleComponentTpl'], function(app, template) {

    return app.directive('exampleInput', [function () {
        return {
            restrict: 'A',
            scope: { value: '=value'},
            template: template,
            link: function (scope, element, attr) {

                scope.count = 0;
                scope.increment = function() {
                    scope.count++;
                };

            }
        };
    }]);
});