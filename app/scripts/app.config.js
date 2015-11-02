(function() {
    'use strict';

    angular
        .module('wearska')
        .config(function($mdThemingProvider) {
            var wskBlue = $mdThemingProvider.extendPalette('blue', {
                '500': '4285F4',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                    // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                 '200', '300', '400', 'A100'],
                'contrastLightColors': undefined   // could also specify this if default was 'dark'
            });
            // Register the new color palette map with the name <code>neonRed</code>
            $mdThemingProvider.definePalette('wsk-blue', wskBlue);
            $mdThemingProvider
            .theme('brand')
            .primaryPalette('wsk-blue',{
              'default': '500'
            })
            .accentPalette('light-blue')
            // .dark();
            
            $mdThemingProvider
            .theme('light')
            .primaryPalette('grey',{
                'default': '50'
            })
            .warnPalette('grey')
            .dark();
        });

})();