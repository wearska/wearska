(function() {
    'use strict';

    angular.module('daksports')
        .factory('typesFactory', function() {
            var obj = {};

            obj.types = [];

            obj.length = function(){
                return obj.types.length;
            }

            return obj;
        });

})();
