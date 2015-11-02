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
                .state('store', {
                    url: '/store',
                    templateUrl: 'app/views/store/store.view.html',
                    params: {
                        brand: null,
                        type: null,
                        kind: null,
                        promo: 0
                    },
                    controller: 'WskStoreController'
                })
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'app/views/auth/auth.view.html',
                    controller: 'WskAuthController'
                });
            $locationProvider.html5Mode(true);
        });

})();