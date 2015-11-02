(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('AppBarCtrl', function($scope, LOGOS, wskScrollFactory) {

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
                if (wskScrollFactory.scrollTop) {
                    $scope.hasHero = true;
                } else {
                    $scope.hasHero = false;
                }
            });
            $scope.$on('hero: off', function() {
                $scope.hasHero = false;
            });
            // $scope.$watch(
            //     // This function returns the value being watched. It is called for each turn of the $digest loop
            //     function() {
            //         return wskScrollFactory.scrollTop;
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