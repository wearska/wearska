(function() {
    'use strict';

    angular.module('wearska')
        .controller('NavCtrl', function($rootScope, $scope, $state, $location, wskAuth, wskNav, wskShoppingCart ,Counter, BrandFilter, TypeFilter, KindFilter, PriceFilter, PromoFilter, FitFilter) {

            // LOGOUT
            this.logout = function() {
                wskAuth.logout();
                $location.path('');
            };

            // FILTERS
            $scope.wskShoppingCart = wskShoppingCart;
            $scope.Counter = Counter;
            $scope.BrandFilter = BrandFilter;
            $scope.TypeFilter = TypeFilter;
            $scope.KindFilter = KindFilter;
            $scope.PriceFilter = PriceFilter;
            $scope.PromoFilter = PromoFilter;
            $scope.FitFilter = FitFilter;
            
            $scope.state = $state;
            $scope.wskNav = wskNav;


        })
        .controller('NavSectionCtrl', function($rootScope, $scope, BrandFilter) {

        })
        .controller('NavListCtrl', function($rootScope, $scope, BrandFilter) {
            var scope = this;
            
            scope.size = 0;
            scope.expanded = false;
            scope.expand = function() {
                scope.expanded = !scope.expanded;
                (scope.expanded) ? scope.size = 44 : scope.size = 0;
            };
        });

})();
