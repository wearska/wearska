(function () {
    'use strict';

    angular
        .module('daksports')
        .controller('MainCtrl', function ($scope, heroService, fileUpload) {
            heroService.src = 'uploads/heroes/grand_opening.jpg';
            heroService.position = 'center';

        });

})();
