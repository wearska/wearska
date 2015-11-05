(function() {
  'use strict';

  angular.module('wearska')
    .directive('wskHero', function() {
      return {
        restrict: 'E',
        controller: 'WskHeroCtrl',
        replace: true,
        templateUrl: 'app/components/hero/hero.tpl.html',
        link: function(scope, el, attr) {

            scope.file = attr.file;

            var $parent = (angular.element(el).closest('main'));
            var $frontpage = angular.element(document.querySelector('#frontpage'));

            angular.element(el).detach().prependTo($parent);
            $frontpage.addClass('with-hero');

            scope.$on('$destroy', function() {
                $frontpage.removeClass('with-hero');
                angular.element(el).remove();
            });
        }
      }
    });

})();
