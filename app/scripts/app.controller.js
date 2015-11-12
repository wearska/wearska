(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('WskCtrl', function($scope, $rootScope, $log, $firebaseArray, $firebaseObject, $mdMedia, FIREBASE_USERS_URL, AUTHDATA, LOGOS, wskAuth, wskItems, wskScrollFactory, wskStoreStructure) {

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
            // STRUCTURE
            // ------------------------

            // DEPARTMENTS

            wsk.structure = {};

            var types = wsk.structure.types;
            var kinds = wsk.structure.kinds;

            var structureRef = wskStoreStructure.$ref();
            var departmentsRef = structureRef.child('departments');
            var departments = $firebaseObject(departmentsRef);
            var typesRef = structureRef.child('types');
            var types = $firebaseObject(typesRef);

            departments.$loaded()
                .then(function(data) {
                    data.$bindTo($scope, "wsk.structure.departments")
                        .then(function() {

                        });
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            types.$loaded()
                .then(function(data) {
                    data.$bindTo($scope, "wsk.structure.types")
                        .then(function() {

                        });
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

        });

})();
