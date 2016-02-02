(function() {
    'use strict';

    angular.module('daksports')
        .factory('kindsFactory', function() {
            var obj = {};

            obj.kinds = [];

            obj.length = function(){
                return obj.kinds.length;
            }

            return obj;
        });

})();
