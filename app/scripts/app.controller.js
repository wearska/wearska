(function () {
    'use strict';

    angular
        .module('daksports')
        .controller('DakCtrl', function ($scope, $rootScope, $log, $firebaseArray, $firebaseObject, $mdMedia, FIREBASE_USERS_URL, AUTHDATA, LOGOS, dakAuth, dakItems, dakScrollFactory, dakStoreStructure) {

            var dak = this;

            $scope.dakScroll = dakScrollFactory;
            dak.LOGOS = LOGOS;

            // ---------------------------
            // ACCOUNT
            // ---------------------------
            dak.account = {};
            dak.logged = false;

            dakAuth.$onAuth(function (authData) {
                if (authData) {
                    dak.logged = true;
                    // get user data
                    var userRef = new Firebase(FIREBASE_USERS_URL + '/' + authData.uid);
                    var userObj = $firebaseObject(userRef);
                    userObj.$bindTo($scope, "account")
                        .then(function () {
                            dak.account = $scope.account;
                        });


                } else {
                    dak.account = {};
                    dak.logged = false;
                }
            });

            // ---------------------------
            // SIDEBAR
            // ---------------------------

            // sidebar toggle

            dak.sidebarOpen = $mdMedia('gt-sm');
            dak.toggleSidebar = function () {
                dak.sidebarOpen = !dak.sidebarOpen;
            };

            // ------------------------
            // ITEMS
            // ------------------------

            dak.items = null;
            dakItems.$loaded()
                .then(function (data) {
                    data.$bindTo($scope, "dak.items")
                        .then(function () {
                            $rootScope.$broadcast('items: loaded', {});
                        });
                })
                .catch(function (error) {
                    console.error("Error:", error);
                });

            // ------------------------
            // STRUCTURE
            // ------------------------

            // DEPARTMENTS

            dak.structure = {};

            var types = dak.structure.types;
            var kinds = dak.structure.kinds;

            var structureRef = dakStoreStructure.$ref();
            var departmentsRef = structureRef.child('departments');
            var departments = $firebaseObject(departmentsRef);
            var typesRef = structureRef.child('types');
            var types = $firebaseObject(typesRef);

            departments.$loaded()
                .then(function (data) {
                    data.$bindTo($scope, "dak.structure.departments")
                        .then(function () {

                        });
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });

            types.$loaded()
                .then(function (data) {
                    data.$bindTo($scope, "dak.structure.types")
                        .then(function () {

                        });
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });

        });

})();
