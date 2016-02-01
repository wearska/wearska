(function() {
    'use strict';

    angular.module('daksports')
        .directive("dakScroll", function($window, $rootScope, dakScrollFactory) {
            return function(scope, element, attrs) {
                var initSHeight = element[0].scrollHeight, // initial element scroll height
                    initCHeight = element[0].clientHeight, // initial client height
                    offsets = parseFloat(element.css('padding-top')) + parseFloat(element.css('padding-bottom')),
                    initialPos = initSHeight - initCHeight - offsets;
                if (initialPos <= 0) {
                    dakScrollFactory.scrollTop = true;
                    dakScrollFactory.scrollBottom = true;
                    dakScrollFactory.scrolled = false;
                    $rootScope.$broadcast('scroll: bottom', {});
                }else if(initialPos > 0){
                    dakScrollFactory.scrollBottom = false;
                }
                element.on("scroll", function(){
                    var scrollTop = element[0].scrollTop, // scroll from top
                        sHeight = element[0].scrollHeight, // element scroll height
                        cHeight = element[0].clientHeight, // client height
                        scrollPosition = sHeight - cHeight - scrollTop;
                    dakScrollFactory.scroll = scrollTop;
                    if (scrollTop === 0 && scrollPosition > 0) {
                        dakScrollFactory.scrollTop = true;
                        dakScrollFactory.scrolled = false;
                        dakScrollFactory.scrollBottom = false;
                        $rootScope.$broadcast('scroll: top', {});
                    } else if(scrollTop !== 0 && scrollPosition > 0) {
                        dakScrollFactory.scrolled = true;
                        dakScrollFactory.scrollTop = false;
                        dakScrollFactory.scrollBottom = false;
                    };
                    if (scrollPosition === 0) {
                        dakScrollFactory.scrolled = true;
                        dakScrollFactory.scrollTop = false;
                        dakScrollFactory.scrollBottom = true;
                        $rootScope.$broadcast('scroll: bottom', {});
                    }
                    scope.$apply();
                });
                angular.element($window).on('resize', function(){
                    element.scroll();
                });

            };
        });

})();
