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
                var profileObj = null;
                if (authData) {
                    console.log("authdata is:");
                    console.log(authData);
                    wsk.logged = true;
                    // // get user data key
                    // var usersRef = new Firebase(FIREBASE_USERS_URL);
                    // var usersObj = $firebaseObject(usersRef);
                    // usersObj.$loaded(function(users) {
                    //     console.log('usersObj : ');
                    //     console.log(usersObj);
                    //     angular.forEach(users, function(data, key) {
                    //         console.log('key is ' + key);
                    //         console.log(data);
                    //         if (data.uid === authData.uid) {
                    //             console.log('user found');
                    //             console.log(key);
                    //             var profileRef = usersRef.child(key);
                    //             profileObj = $firebaseObject(profileRef);
                    //             profileObj.$bindTo($scope, "account")
                    //             .then(function(unbind) {
                    //                 wsk.account = $scope.account;
                    //                 console.log('user data bound');
                    //                 console.log(wsk.account);
                    //             })
                    //         };
                    //     });
                    // });
                    // get user data
                    var userRef = new Firebase(FIREBASE_USERS_URL + '/' + authData.uid);
                    var userObj = $firebaseObject(userRef);
                    console.log(userObj);
                    userObj.$bindTo($scope, "account")
                        .then(function(unbind) {
                            wsk.account = $scope.account;
                            console.log('user data bound');
                            console.log(wsk.account);
                        })


                } else {
                    console.log("no authData");
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
            }

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
