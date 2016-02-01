(function() {
    'use strict';

    angular.module('daksports')
        .factory('depsFactory', function(FIREBASE_URL) {
            var ref = new Firebase(FIREBASE_URL + '/structure/departments');
            var deps = $firebaseObject(ref);

            var obj = {};


            return obj;
        });

})();
