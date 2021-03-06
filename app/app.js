define(['angularAMD', 'angular-ui-router', 'angular-resource', 'angular-messages', 'angular-jwt', 'angular-local-storage', 'angulartics-piwik', 'angulartics-scroll'], function (angularAMD) {

    var app = angular.module('myApp', [
        'ngResource',
        'ngMessages',
        'ui.router',
        'angular-jwt',
        'LocalStorageModule',
        'angulartics',
        'angulartics.piwik',
        'angulartics.scroll'
    ]);

    app.config(function($httpProvider, jwtInterceptorProvider, localStorageServiceProvider) {

      var lsPrefix = "ls";
      localStorageServiceProvider.setPrefix(lsPrefix);
      jwtInterceptorProvider.tokenGetter = function(config) {
        var user = localStorage.getItem(lsPrefix + '.user');
        if (user && user.token) {
          return user.token;
        }
        
        return false
        
      };
      $httpProvider.interceptors.push('jwtInterceptor');
    });

    /* Angulartics configuration */
    app.config(function ($analyticsProvider) {
      // turns off to avoid automatic tracking in unit tests
      $analyticsProvider.firstPageview(false);
    });

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $injector) {
      $urlRouterProvider.otherwise('/home');
      $stateProvider
        .state('home', angularAMD.route({
          url: '/home',
          templateUrl: 'app/pages/example/example.html',
          controller: 'exampleCtrl'
      }))
      .state('home.login', angularAMD.route({
        url: '/login',
        templateUrl: 'app/pages/account/login.html',
        controller: 'loginCtrl'
      }))
      .state('home.register', angularAMD.route({
        url: '/register',
        templateUrl: 'app/pages/account/register.html',
        controller: 'registerCtrl'
      }));

      // $locationProvider.html5Mode(true);
    });

    // Bootstrap Angular when DOM is ready
    return angularAMD.bootstrap(app);
});