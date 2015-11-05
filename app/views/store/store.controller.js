(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('WskStoreCtrl', function($scope, $rootScope, $state) {
            $rootScope.$broadcast('store: open', {});
        });

})();