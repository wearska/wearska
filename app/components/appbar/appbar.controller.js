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

        });

})();