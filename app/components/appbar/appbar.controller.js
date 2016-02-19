(function() {
    'use strict';

    angular
        .module('daksports')
        .controller('AppBarCtrl', function($scope, $log, LOGOS, dakScrollFactory) {

            $scope.LOGOS = LOGOS;

            // TOGGLE SEARCH BAR
            $scope.showSearchBar = false;
            $scope.toggleSearchBar = function() {
                $scope.showSearchBar = !$scope.showSearchBar;
            };
            $scope.hideSearchBar = function() {
                $scope.showSearchBar = false;
            };

            // -----------------------
            // HANDLE TRANSPARENCY IF THE PAGE HAS A HERO
            // -----------------------

            $scope.hasHero = false;
            $scope.$on('hero: on', function() {
                dakScrollFactory.scrollTop = true;
                $log.warn('hero is on');
                if (dakScrollFactory.scrollTop) {
                    $scope.hasHero = true;
                } else {
                    $scope.hasHero = false;
                }
            });
            $scope.$on('hero: off', function() {
                $log.warn('hero is off');
                $scope.hasHero = false;
            });
            // $scope.$watch(
            //     // This function returns the value being watched. It is called for each turn of the $digest loop
            //     function() {
            //         return dakScrollFactory.scrollTop;
            //     },
            //     // This is the change listener, called when the value returned from the above function changes
            //     function(newValue, oldValue) {
            //         if (newValue !== oldValue) {
            //             // Only increment the counter if the value changed
            //             $scope.hasHero = newValue;
            //         }
            //     }
            // );

        });

})();
