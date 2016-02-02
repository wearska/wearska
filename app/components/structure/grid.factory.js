(function() {
    'use strict';

    angular.module('daksports')
        .factory('gridFactory', function() {
            var obj = {};

            obj.grid = [];

            obj.length = function(){
                return obj.grid.length;
            }

            return obj;
        });

})();
