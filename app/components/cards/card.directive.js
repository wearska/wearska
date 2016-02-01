(function() {
  'use strict';

  angular.module('daksports')
    .directive('dakCard', function() {
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
    .directive('dakCardPreview', function() {
      return {
        restrict: 'E',
        controller: 'CardCtrl',
        scope: {
          item: '=cardResource',
        },
        replace: true,
        templateUrl: 'app/components/cards/card.preview.tpl.html',
        link: function(scope, el, attr) {
        }
      }
    })
    .directive('dakTile', function() {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, el, attr) {
          el.addClass('dak-tile');
        }
      }
    });

})();
