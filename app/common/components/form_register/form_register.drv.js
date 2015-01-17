define(['app', 'require-text!formRegisterTpl'], function(app, template) {

    return app.directive('formRegister', [function () {
        return {
            restrict: 'A',
            scope: {callback: '=', passwordMinLength: '@'},
            template: template,
            link: function (scope, element, attr) {
                scope.user = {};
                scope.passwordMinLength = scope.passwordMinLength || 6;
                scope.submit = function(email, password, password_confirmation, username) {

                    if (password != password_confirmation) {
                        return "Password and confirmation don't match";
                    }

                    return scope.callback(email, password, username);
                };

            }
        };
    }]);
});