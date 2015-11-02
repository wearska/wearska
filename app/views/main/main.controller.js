(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('MainController', function($scope, wskScrollFactory) {
            $scope.wskScroll = wskScrollFactory;
        });

})();