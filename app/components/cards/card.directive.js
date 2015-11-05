(function() {
  'use strict';

  angular.module('wearska')
    .directive('wskCard', function() {
      return {
        restrict: 'E',
        controller: 'CardCtrl',
        scope: {
          item: '=cardResource',
        },
        replace: true,
        templateUrl: 'app/components/cards/card.tpl.html',
        link: function(scope, el, attr) {
        }
      }
    })
    .directive('wskTile', function() {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, el, attr) {
          el.addClass('wsk-tile');
        }
      }
    });

})();
