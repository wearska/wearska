(function() {
    'use strict';

    angular.module('wearska')
        .controller('WskHeroController', function($rootScope, $scope, wskScrollFactory) {

            $rootScope.$broadcast('hero: on', {});
            
            $scope.wskScroll = wskScrollFactory;

            $scope.$on('$destroy', function() {
                $rootScope.$broadcast('hero: off', {});
            });
        });

})();
