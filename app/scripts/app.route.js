(function() {
    'use strict';

    angular
        .module('wearska')
        .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
            // For any unmatched url, redirect to /
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'app/views/main/main.view.html',
                    controller: 'MainController'
                })
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'app/views/auth/auth.view.html',
                    controller: 'WskAuthController'
                });
            $locationProvider.html5Mode(true);
        });

})();