(function() {
    'use strict';

    angular.module('daksports')
        .factory('brandsFactory', function() {
            var obj = {};

            obj.brands = [];

            obj.length = function(){
                return obj.brands.length;
            }

            return obj;
        });

})();
