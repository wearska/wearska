(function() {
    'use strict';

    angular.module('wearska')
        .controller('WskHeroController', function($rootScope, $scope) {
            $scope.file = "uploads/heroes/slide_puma.jpg";

            $rootScope.$broadcast('hero: on', {});

            $scope.$on('$destroy', function() {
                $rootScope.$broadcast('hero: off', {});
            });
        });

})();
