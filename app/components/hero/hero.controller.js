(function() {
    'use strict';

    angular.module('daksports')
        .controller('DakHeroCtrl', function($rootScope, $scope, dakScrollFactory, heroService) {

            $rootScope.$broadcast('hero: on', {});

            $scope.$on('$destroy', function () {
                $rootScope.$broadcast('hero: off', {});
            });

            var hero = this;

            hero.dakScroll = dakScrollFactory;
            hero.heroService = heroService;
            hero.src = heroService.src;
        });

})();
