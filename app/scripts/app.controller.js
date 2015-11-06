(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('WskCtrl', function($scope, $rootScope, $firebaseObject, $mdMedia, FIREBASE_USERS_URL, AUTHDATA, LOGOS, wskAuth, wskItems, wskScrollFactory) {

            var wsk = this;

            $scope.wskScroll = wskScrollFactory;
            wsk.LOGOS = LOGOS;

            // ---------------------------
            // ACCOUNT
            // ---------------------------
            wsk.account = {};
            wsk.logged = false;

            wskAuth.$onAuth(function(authData) {
                if (authData) {
                    wsk.logged = true;
                    // get user data
                    var userRef = new Firebase(FIREBASE_USERS_URL + '/' + authData.uid);
                    var userObj = $firebaseObject(userRef);
                    userObj.$bindTo($scope, "account")
                        .then(function() {
                            wsk.account = $scope.account;
                        });


                } else {
                    wsk.account = {};
                    wsk.logged = false;
                }
            });

            // ---------------------------
            // SIDEBAR
            // ---------------------------

            // sidebar toggle

            wsk.sidebarOpen = $mdMedia('gt-sm');
            wsk.toggleSidebar = function() {
                wsk.sidebarOpen = !wsk.sidebarOpen;
            };

            // ------------------------
            // ITEMS
            // ------------------------

            wsk.items = null;
            wskItems.$loaded()
                .then(function(data) {
                    data.$bindTo($scope, "wsk.items")
                        .then(function() {
                            $rootScope.$broadcast('items: loaded', {});
                        });
                })
                .catch(function(error) {
                    console.error("Error:", error);
                });

            // ------------------------
            // BRANDS
            // ------------------------

            wsk.brands = [
                'Adidas',
                'Puma',
                'Reebok',
                'Le Coq Sportif'
            ];

        });

})();
