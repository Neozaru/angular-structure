NGMOD.config(function($stateProvider, $urlRouterProvider, $injector) {
  $stateProvider
    .state('home', {
      url: '',
      templateUrl: "app/pages/example/example.html",
      controller: "exampleCtrl"
  });
});
