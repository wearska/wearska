(function() {
    'use strict';

    angular.module('daksports')
        .factory('depsFactory', function() {
            var obj = {};

            obj.deps = [];

            obj.length = function(){
                return obj.deps.length;
            }

            return obj;
        });

})();
