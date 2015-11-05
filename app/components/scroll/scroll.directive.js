(function() {
    'use strict';

    angular.module('wearska')
        .directive("wskScroll", function($window, $rootScope, wskScrollFactory) {
            return function(scope, element, attrs) {
                var initSHeight = element[0].scrollHeight, // initial element scroll height
                    initCHeight = element[0].clientHeight, // initial client height
                    offsets = parseFloat(element.css('padding-top')) + parseFloat(element.css('padding-bottom')),
                    initialPos = initSHeight - initCHeight - offsets;
                if (initialPos <= 0) {
                    wskScrollFactory.scrollTop = true;
                    wskScrollFactory.scrollBottom = true;
                    wskScrollFactory.scrolled = false;
                    $rootScope.$broadcast('scroll: bottom', {});
                }else if(initialPos > 0){
                    wskScrollFactory.scrollBottom = false;
                }
                element.on("scroll", function() {
                    var scrollTop = element[0].scrollTop, // scroll from top
                        sHeight = element[0].scrollHeight, // element scroll height
                        cHeight = element[0].clientHeight, // client height
                        scrollPosition = sHeight - cHeight - scrollTop;
                    wskScrollFactory.scroll = scrollTop;
                    if (scrollTop === 0 && scrollPosition > 0) {
                        wskScrollFactory.scrollTop = true;
                        wskScrollFactory.scrolled = false;
                        wskScrollFactory.scrollBottom = false;
                        $rootScope.$broadcast('scroll: top', {});
                    } else if(scrollTop !== 0 && scrollPosition > 0) {
                        wskScrollFactory.scrolled = true;
                        wskScrollFactory.scrollTop = false;
                        wskScrollFactory.scrollBottom = false;
                    };
                    if (scrollPosition === 0) {
                        wskScrollFactory.scrolled = true;
                        wskScrollFactory.scrollTop = false;
                        wskScrollFactory.scrollBottom = true;
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