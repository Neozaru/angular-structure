define(['angularAMD', 'angular-ui-router', 'angular-resource'], function (angularAMD) {

    var app = angular.module('myApp', [
        'ngResource',
        'ui.router',
    ]);

    app.config(function($stateProvider, $urlRouterProvider, $injector) {
      $stateProvider
        .state('home', angularAMD.route({
          url: '',
          templateUrl: "app/pages/example/example.html",
          controller: "exampleCtrl"
      }));
    });

    // Bootstrap Angular when DOM is ready
    return angularAMD.bootstrap(app);
});