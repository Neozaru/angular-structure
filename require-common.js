/* Allows to have common dependencies in "main" and "test-main" */
define([], function() {
    return {
        paths: {
            'require-text': "bower_components/requirejs-text/text",
            'angular': 'bower_components/angular/angular',
            'angular-route': 'bower_components/angular-route/angular-route',
            'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
            'angularAMD': 'bower_components/angularAMD/angularAMD',
            'ngload': 'bower_components/angularAMD/ngload',
            'angular-resource': 'bower_components/angular-resource/angular-resource',
            'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
            'app': 'app/app',
            /* I chose to declare each Controller/Service/Directive here, 
               so I don't need to use path when requiring them in app and tests. */
            // Controllers
            'exampleCtrl': 'app/pages/example/example.ctrl',

            // Services
            'exampleService': 'app/common/services/example.srv',

            // Components
            'exampleComponent': 'app/common/components/example_input/example_input.drv',
            'exampleComponentTpl': 'app/common/components/example_input/example_input.html'
        },
        shim: {
          'angular': {
            exports: 'angular',
            deps: ['require-text']
          },
          'angular-route': ['angular'],
          'angularAMD': ['angular'],
          'ngload': ['angularAMD'],
          'angular-resource': ['angular'],
          'angular-ui-router': ['angular'],
          'angular-mocks': {
            deps:['angular'],
            'exports':'angular.mock'
          }
        }
    };
});