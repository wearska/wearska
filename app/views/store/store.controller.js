(function() {
    'use strict';

    angular
        .module('daksports')
        .controller('DakStoreCtrl', function($scope, $rootScope, $state, heroService) {
            $rootScope.$broadcast('store: open', {});

            console.log($state);

            $scope.department = $state.params.department;

            heroService.src = $scope.department.hero;
            heroService.position = $scope.department.position;

        });

})();
