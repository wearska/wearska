(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('WskController', function($scope) {
            $scope.account = {};

            $scope.$on('user-data: bound', function(event, obj) {
                // obj contains the user data
                $scope.account = obj;
            });
        });

})();