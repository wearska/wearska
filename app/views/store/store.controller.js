(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('WskStoreController', function($scope, $rootScope, $state) {
            $rootScope.$broadcast('store: open', {});
        });

})();