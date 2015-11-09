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
                    controller: 'MainCtrl'
                })
                .state('store', {
                    url: '/store',
                    templateUrl: 'app/views/store/store.view.html',
                    controller: 'WskStoreCtrl'
                })
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'app/views/auth/auth.view.html',
                    controller: 'WskAuthCtrl'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'app/views/admin/admin.view.html',
                    controller: 'WskAdminCtrl'
                })
                .state('admin.add', {
                    url: '/add',
                    templateUrl: 'app/views/admin/admin.add.view.html',
                    controller: 'WskAddCtrl'
                })
                .state('admin.settings', {
                    url: '/settings',
                    templateUrl: 'app/views/admin/settings/admin.settings.view.html',
                    controller: 'WskAdminSettingsCtrl'
                });
            $locationProvider.html5Mode(true);
        });

})();
