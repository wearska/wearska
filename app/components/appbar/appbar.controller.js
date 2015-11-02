(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('AppBarCtrl', function($scope, LOGOS) {

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
            $scope.$on('hero: on', function(){
                $scope.hasHero = true;
            });
            $scope.$on('hero: off', function(){
                $scope.hasHero = false;
            });

        });

})();
