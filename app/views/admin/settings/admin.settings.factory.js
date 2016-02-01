(function() {
    'use strict';

    angular
        .module('daksports')
        .factory('dakStoreStructure', function($rootScope, $log, $q, $firebaseArray, $firebaseObject, FIREBASE_URL, PLACEHOLDERS) {
            var ref = new Firebase(FIREBASE_URL + '/structure');
            var structure = $firebaseObject(ref);


            return structure;
        });

})();
