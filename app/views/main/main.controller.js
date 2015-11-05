(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('MainCtrl', function($scope, wskScrollFactory, wskItems) {
            $scope.wskScroll = wskScrollFactory;
            
            $scope.wskItems = wskItems;
        });

})();