(function() {
    'use strict';

    angular.module('daksports')
        .controller('DakHeroCtrl', function($rootScope, $scope, $location, dakScrollFactory, heroService) {

            $rootScope.$broadcast('hero: on', {});

            $scope.$on('$destroy', function() {
                $rootScope.$broadcast('hero: off', {});
            });

            var hero = this;

            $scope.$on("$locationChangeStart", function(event, next, current) {
                hero.dakScroll.scroll = 0;
                $rootScope.$broadcast('hero: off', {});
            });

            $scope.$on("$locationChangeSuccess", function(event) {
                $rootScope.$broadcast('hero: on', {});
            });

            hero.dakScroll = dakScrollFactory;
            hero.heroService = heroService;
            hero.src = heroService.src;
        });

})();
