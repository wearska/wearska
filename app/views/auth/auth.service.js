(function() {
    'use strict';

    angular
        .module('daksports')
        .factory('dakAuth', function($rootScope, $log, $q, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL, PLACEHOLDERS, $location) {
            var ref = new Firebase(FIREBASE_URL);
            var authObj = $firebaseAuth(ref);
            return authObj;
        });

})();
