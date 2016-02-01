(function () {
    'use strict';

    angular
        .module('daksports')
        .component('dakHero', {
            restrict: 'E',
            controller: 'DakHeroCtrl',
            controllerAs: 'hero',
            templateUrl: 'app/components/hero/hero.tpl.html'
        });

})();
