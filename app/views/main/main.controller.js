(function() {
    'use strict';

    angular
        .module('daksports')
        .controller('MainCtrl', function($scope, dakScrollFactory, heroService, dakItems) {
            $scope.dakScroll = dakScrollFactory;

            $scope.dakItems = dakItems;

            heroService.src = 'uploads/heroes/grand_opening.jpg';
            heroService.position = 'center';
        });

})();
