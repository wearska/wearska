(function () {
    'use strict';

    angular
        .module('daksports')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $firebaseAuth, FIREBASE_URL, AUTHDATA) {

        var ref = new Firebase(FIREBASE_URL);
        var authObj = $firebaseAuth(ref);

        var authData = authObj.$getAuth();
        // $log.debug("checking if session exists");

        if (authData) {
            // $log.debug("Session exists");
            AUTHDATA.logged = true;
            AUTHDATA.uid = authData.uid;
        } else {
            // $log.debug("No session present");
            AUTHDATA.logged = false;
            AUTHDATA.uid = null;
        }
        // $log.debug('runBlock end');

    }

})();
