(function() {
    'use strict';

    angular.module('wearska')
        .factory('Counter', function($rootScope, $filter, BrandFilter, TypeFilter, KindFilter, PriceFilter, PromoFilter, FitFilter){
            var obj = {};
            var res = {};
            obj.count = function(query, list) {
                if (list === 'brands') {
                    res = $filter('typeFilter')($rootScope.products, TypeFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('brandFilter')(res, query).length;
                }else if(list === 'types'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('typeFilter')(res, query).length;
                }else if(list === 'kinds'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('typeFilter')(res, TypeFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('kindFilter')(res, query).length;
                }else if(list === 'prices'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('typeFilter')(res, TypeFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('priceFilter')(res, query).length;
                }else if(list === 'promos'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('typeFilter')(res, TypeFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('promoFilter')(res, query).length;
                }else if(list === 'fit'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('typeFilter')(res, TypeFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    return $filter('fitForMeFilter')(res, query).length;
                }
            }
            
            obj.filtersOn = function(){
                var bool = false;
                if(BrandFilter.selected.length || TypeFilter.selected.length || KindFilter.selected.length || PriceFilter.selected != null || PromoFilter.state){
                    bool = true;
                }
                return bool;
            }
            return obj;
        })
        .factory('BrandFilter', function() {
            var obj = {};
            obj.selected = [];

            obj.toggle = function(brand) {
                var idx = obj.selected.indexOf(brand);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(brand);
            };
            obj.exists = function(brand) {
                return obj.selected.indexOf(brand) > -1;
            };
            obj.reset = function() {
                obj.selected = [];
            }

            return obj;
        })
        .factory('TypeFilter', function() {
            var obj = {};
            obj.selected = [];

            obj.toggle = function(type) {
                var idx = obj.selected.indexOf(type);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(type);
            };
            obj.exists = function(type) {
                return obj.selected.indexOf(type) > -1;
            };
            obj.reset = function() {
                obj.selected = [];
            }
            return obj;
        })
        .factory('KindFilter', function() {
            var obj = {};
            obj.selected = [];

            obj.toggle = function(kind) {
                var idx = obj.selected.indexOf(kind);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(kind);
            };
            obj.exists = function(kind) {
                return obj.selected.indexOf(kind) > -1;
            };
            obj.reset = function() {
                obj.selected = [];
            }
            return obj;
        })
        .factory('PriceFilter', function() {
            var obj = {};
            obj.selected = null;
            return obj;
        })
        .factory('PromoFilter', function() {
            var obj = {};
            obj.state = 0;
            return obj;
        })
        .factory('FitFilter', function() {
            var obj = {};
            obj.state = 0;
            return obj;
        });

})();