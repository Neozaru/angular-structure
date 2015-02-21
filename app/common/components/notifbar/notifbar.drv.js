define(['app', 'require-text!notifBarTpl'], function(app, template) {

    return app.directive('notifBar', [function () {
        return {
            restrict: 'A',
            scope: {getter: '='},
            template: template,
            link: function (scope, element, attr) {
                scope.notifications = [];

                scope.$watchCollection('getter()', function(new_value) {
                   scope.notifications = new_value;
               });
            }
        };
    }]);
});