(function() {
    'use strict';

    angular
        .module('wearska')
        .factory('wskItems', function($rootScope, $firebaseObject, FIREBASE_URL) {
            var ref = new Firebase(FIREBASE_URL + '/items');
            var itemsObj = $firebaseObject(ref);

            return itemsObj;
        });

})();