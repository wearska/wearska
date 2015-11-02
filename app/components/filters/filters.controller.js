(function() {
  'use strict';

  angular.module('wearska')
    .controller('FilterBlockCtrl', function($scope) {

    })
    .controller('FilterParentCtrl', function($scope) {
      $scope.expanded = false;
      $scope.active = false;
      $scope.expand = function() {
        $scope.expanded = !$scope.expanded;
      }
    });

})();