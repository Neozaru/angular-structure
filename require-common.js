/* Allows to have common dependencies in "main" and "test-main" */
define([], function() {
    return {
        paths: {
            'require-text': "bower_components/requirejs-text/text",
            'angular': 'bower_components/angular/angular',
            // 'angular-route': 'bower_components/angular-route/angular-route',
            'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
            'angularAMD': 'bower_components/angularAMD/angularAMD',
            'ngload': 'bower_components/angularAMD/ngload',
            'angular-resource': 'bower_components/angular-resource/angular-resource',
            'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
            'angular-jwt': 'bower_components/angular-jwt/dist/angular-jwt',
            'angular-local-storage': 'bower_components/angular-local-storage/dist/angular-local-storage',
            'angular-messages': 'bower_components/angular-messages/angular-messages',
            'app': 'app/app',
            /* I chose to declare each Controller/Service/Directive here, 
               so I don't need to use path when requiring them in app and tests. */
            // Controllers
            'exampleCtrl': 'app/pages/example/example.ctrl',
            'loginCtrl': 'app/pages/account/login.ctrl',
            'registerCtrl': 'app/pages/account/register.ctrl',

            // Services
            'exampleService': 'app/common/services/example.srv',
            'usersService': 'app/common/services/users.srv',
            'sessionsService': 'app/common/services/sessions.srv',
            'authenticationService': 'app/common/services/authentication.srv',
            'notificationsService': 'app/common/services/notifications.srv',

            // Components
            'exampleComponent': 'app/common/components/example_input/example_input.drv',
            'exampleComponentTpl': 'app/common/components/example_input/example_input.html',
            'formRegister': 'app/common/components/form_register/form_register.drv',
            'formRegisterTpl': 'app/common/components/form_register/form_register.html',
            'formLogin': 'app/common/components/form_login/form_login.drv',
            'formLoginTpl': 'app/common/components/form_login/form_login.html',
            'notifBar': 'app/common/components/notifbar/notifbar.drv',
            'notifBarTpl': 'app/common/components/notifbar/notifbar.html',

            'configJson': 'config.json',
            'config': 'config',

            /* Will not be a dependency in web app */
            'chai': 'node_modules/chai/chai',
            'chai-as-promised': 'node_modules/chai-as-promised/lib/chai-as-promised'
        },
        shim: {
          'angular': {
            exports: 'angular',
            deps: ['require-text']
          },
          'angularAMD': ['angular'],
          'ngload': ['angularAMD'],
          'angular-resource': ['angular'],
          'angular-ui-router': ['angular'],
          'angular-jwt': ['angular'],
          'angular-local-storage': ['angular'],
          'angular-messages': ['angular'],
          'angular-mocks': {
            deps:['angular'],
            'exports':'angular.mock'
          }
        }
    };
});