(function() {
    'use strict';

    angular
        .module('daksports')
        .controller('MainCtrl', function($scope, heroService) {
            heroService.src = 'uploads/heroes/grand_opening.jpg';
            heroService.position = 'center';
        });

})();
