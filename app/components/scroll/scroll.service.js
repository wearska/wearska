(function() {
    'use strict';

    angular.module('daksports')
        .factory('dakScrollFactory', function() {
            var obj = {};
            
            // is element scrolled or not
            obj.scrolled = false;
            
            // scroll amount
            obj.scroll = 0;
            
            // is scroll position at the (specified) top position?
            obj.scrollTop = true;
            
            // is scroll position at the (specified) bottom position?
            obj.scrollBottom = false;
            
            // what element is in views
            // to be implemented in the future
            obj.scrollView = undefined;
            
            
            return obj;
        });

})();