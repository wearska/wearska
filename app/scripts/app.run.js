(function() {
    'use strict';

    angular
        .module('wearska')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $firebaseAuth, FIREBASE_URL, AUTHDATA) {

        var ref = new Firebase(FIREBASE_URL);
        var authObj = $firebaseAuth(ref);

        var authData = authObj.$getAuth();

        if (authData) {
            AUTHDATA.logged = true;
            AUTHDATA.uid = authData.uid;
        } else {
            $log.debug("Logged out");
        }

        $log.debug('runBlock end');
    }

})();