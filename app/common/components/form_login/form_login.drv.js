define(['app', 'require-text!formLoginTpl'], function(app, template) {

    return app.directive('formLogin', [function () {
        return {
            restrict: 'A',
            scope: {callback: '='},
            template: template,
            link: function (scope, element, attr) {
                scope.user = {};
                scope.submit = function(email, password) {
                    return scope.callback(email, password);
                };

            }
        };
    }]);
});