(function() {
    'use strict';

    angular
        .module('daksports')
        .controller('DakCtrl', function($scope, $rootScope, $log, $firebaseArray, $firebaseObject, $mdMedia, FIREBASE_USERS_URL, FIREBASE_URL, AUTHDATA, LOGOS, dakAuth, dakItems, dakScrollFactory, dakStoreStructure) {

            var dak = this;

            $scope.dakScroll = dakScrollFactory;
            dak.LOGOS = LOGOS;

            // ---------------------------
            // ACCOUNT
            // ---------------------------
            dak.account = {};
            dak.logged = false;

            dakAuth.$onAuth(function(authData) {
                if (authData) {
                    dak.logged = true;
                    // get user data
                    var userRef = new Firebase(FIREBASE_USERS_URL + '/' + authData.uid);
                    var userObj = $firebaseObject(userRef);
                    userObj.$bindTo($scope, "account")
                        .then(function() {
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
            dak.toggleSidebar = function() {
                dak.sidebarOpen = !dak.sidebarOpen;
            };

            // ------------------------
            // ITEMS
            // ------------------------

            dak.items = null;
            dakItems.$loaded()
                .then(function(data) {
                    data.$bindTo($scope, "dak.items")
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

            var structureRef = new Firebase(FIREBASE_URL + '/structure');
            var departmentsRef = structureRef.child('departments');
            var departments = $firebaseArray(departmentsRef);
            var brandsRef = structureRef.child('brands');
            var brands = $firebaseArray(brandsRef);
            var typesRef = structureRef.child('types');
            var types = $firebaseArray(typesRef);
            var kindsRef = structureRef.child('kinds');
            var kinds = $firebaseArray(kindsRef);

            dak.structure = {};


            // load departments
            departments.$loaded()
                .then(function(data) {
                    dak.structure.departments = data;
                    $rootScope.$broadcast('departments: bound', {});
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            // load brands
            brands.$loaded()
                .then(function(data) {
                    dak.structure.brands = data;
                    $rootScope.$broadcast('brands: bound', {});
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            // load types
            types.$loaded()
                .then(function(data) {
                    dak.structure.types = data;
                    $rootScope.$broadcast('types: bound', {});
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            // load kinds
            kinds.$loaded()
                .then(function(data) {
                    dak.structure.kinds = data;
                    $rootScope.$broadcast('kinds: bound', {});
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

        });

})();
