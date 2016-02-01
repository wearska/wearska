(function() {
    'use strict';

    angular.module('daksports')
        .factory('heroService', function() {
            var obj = {};

            // hero file path
            obj.src = '';

            obj.position = 'center';

            return obj;
        });

})();
