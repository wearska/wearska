(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('WskStoreCtrl', function($scope, $rootScope, $state) {
            $rootScope.$broadcast('store: open', {});

            console.log($state.params);
            $scope.department = $state.params.department;

        });

})();
